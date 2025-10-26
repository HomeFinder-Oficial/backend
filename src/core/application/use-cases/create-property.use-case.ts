import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { IPropertyRepository } from 'src/core/domain/ports/property.repository';
import { PROPERTY_REPOSITORY } from 'src/core/domain/ports/property.repository';
import type { ILocationRepository } from 'src/core/domain/ports/location.repository';
import { LOCATION_REPOSITORY } from 'src/core/domain/ports/location.repository';
import type { IPropertyTypeRepository } from 'src/core/domain/ports/property-type.repository';
import { PROPERTY_TYPE_REPOSITORY } from 'src/core/domain/ports/property-type.repository';
import type { IPropertyImageRepository } from 'src/core/domain/ports/property-image.repository';
import { PROPERTY_IMAGE_REPOSITORY } from 'src/core/domain/ports/property-image.repository';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { Property } from 'src/core/domain/entities/property.entity';

@Injectable()
export class CreatePropertyUseCase {
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

  async execute(dto: CreatePropertyDto, ownerId: string): Promise<Property> {
    const typeExists = await this.propertyTypeRepository.findById(
      dto.id_tipo_inmueble,
    );
    if (!typeExists) {
      throw new NotFoundException('Tipo de inmueble no encontrado');
    }

    const location = await this.locationRepository.create({
      direccion: dto.ubicacion?.direccion,
      ciudad: dto.ubicacion?.ciudad,
      barrio: dto.ubicacion?.barrio,
      latitud: dto.ubicacion?.latitud,
      longitud: dto.ubicacion?.longitud,
      activo: true,
    });

    const property = await this.propertyRepository.create({
      titulo: dto.titulo,
      descripcion: dto.descripcion,
      precio: dto.precio,
      area_m2: dto.area_m2,
      habitaciones: dto.habitaciones,
      banos: dto.banos,
      activo: true,
      id_propietario: ownerId,
      id_tipo_inmueble: dto.id_tipo_inmueble,
      id_ubicacion: location.id,
    });

    if (dto.fotos && dto.fotos.length > 0) {
      for (let i = 0; i < dto.fotos.length; i++) {
        await this.photoRepository.create({
          id_inmueble: property.id,
          url: dto.fotos[i],
          numero: i + 1,
        });
      }
    }

    const completeProperty = await this.propertyRepository.findById(
      property.id,
    );
    return completeProperty!;
  }
}
