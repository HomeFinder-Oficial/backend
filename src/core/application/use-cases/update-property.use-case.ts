import {
  Inject,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import type { IPropertyRepository } from 'src/core/domain/ports/property.repository';
import { PROPERTY_REPOSITORY } from 'src/core/domain/ports/property.repository';
import type { ILocationRepository } from 'src/core/domain/ports/location.repository';
import { LOCATION_REPOSITORY } from 'src/core/domain/ports/location.repository';
import type { IPropertyTypeRepository } from 'src/core/domain/ports/property-type.repository';
import { PROPERTY_TYPE_REPOSITORY } from 'src/core/domain/ports/property-type.repository';
import type { IPropertyImageRepository } from 'src/core/domain/ports/property-image.repository';
import { PROPERTY_IMAGE_REPOSITORY } from 'src/core/domain/ports/property-image.repository';
import { Property } from 'src/core/domain/entities/property.entity';
import { UpdatePropertyDto } from '../dto/update-property.dto';

@Injectable()
export class UpdatePropertyUseCase {
  constructor(
    @Inject(PROPERTY_REPOSITORY)
    private readonly propertyRepository: IPropertyRepository,
    @Inject(LOCATION_REPOSITORY)
    private readonly locationRepository: ILocationRepository,
    @Inject(PROPERTY_TYPE_REPOSITORY)
    private readonly propertyTypeRepository: IPropertyTypeRepository,
    @Inject(PROPERTY_IMAGE_REPOSITORY)
    private readonly photoRepository: IPropertyImageRepository,
  ) {}

  async execute(
    propertyId: string,
    dto: UpdatePropertyDto,
    userId: string,
  ): Promise<Property> {
    const property = await this.propertyRepository.findById(propertyId);
    if (!property) {
      throw new NotFoundException('Inmueble no encontrado');
    }

    if (!property.belongsTo(userId)) {
      throw new ForbiddenException(
        'No tienes permiso para actualizar el inmueble',
      );
    }

    if (dto.ubicacion) {
      await this.locationRepository.update(property.id_ubicacion, {
        direccion: dto.ubicacion.direccion,
        ciudad: dto.ubicacion.ciudad,
        barrio: dto.ubicacion.barrio,
        latitud: dto.ubicacion.latitud,
        longitud: dto.ubicacion.longitud,
      });
    }

    if (dto.fotos !== undefined) {
      await this.photoRepository.deleteByProperty(propertyId);

      if (dto.fotos.length > 0) {
        for (let i = 0; i < dto.fotos.length; i++) {
          await this.photoRepository.create({
            id_inmueble: propertyId,
            url: dto.fotos[i],
            numero: i + 1,
          });
        }
      }
    }

    if (dto.id_tipo_inmueble) {
      const typeExists = await this.propertyTypeRepository.findById(
        dto.id_tipo_inmueble,
      );
      if (!typeExists) {
        throw new NotFoundException('Tipo de inmueble no encontrado');
      }
    }

    const updatedProperty = await this.propertyRepository.update(propertyId, {
      titulo: dto.titulo,
      descripcion: dto.descripcion,
      precio: dto.precio,
      area_m2: dto.area_m2,
      habitaciones: dto.habitaciones,
      banos: dto.banos,
      id_tipo_inmueble: dto.id_tipo_inmueble,
    });

    return updatedProperty;
  }
}
