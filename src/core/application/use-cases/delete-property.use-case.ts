import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { IPropertyRepository } from 'src/core/domain/ports/property.repository';
import { PROPERTY_REPOSITORY } from 'src/core/domain/ports/property.repository';
import type { ILocationRepository } from 'src/core/domain/ports/location.repository';
import { LOCATION_REPOSITORY } from 'src/core/domain/ports/location.repository';
import type { IPropertyImageRepository } from 'src/core/domain/ports/property-image.repository';
import { PROPERTY_IMAGE_REPOSITORY } from 'src/core/domain/ports/property-image.repository';

@Injectable()
export class DeletePropertyUseCase {
  constructor(
    @Inject(PROPERTY_REPOSITORY)
    private readonly propertyRepository: IPropertyRepository,
    @Inject(LOCATION_REPOSITORY)
    private readonly locationRepository: ILocationRepository,
    @Inject(PROPERTY_IMAGE_REPOSITORY)
    private readonly photoRepository: IPropertyImageRepository,
  ) {}

  async execute(propertyId: string, userId: string): Promise<void> {
    const property = await this.propertyRepository.findById(propertyId);
    if (!property) {
      throw new NotFoundException('Inmueble no encontrado');
    }

    if (!property.belongsTo(userId)) {
      throw new ForbiddenException(
        'No tienes permiso para eliminar el inmueble',
      );
    }

    await this.photoRepository.deleteByProperty(propertyId);

    await this.propertyRepository.delete(propertyId);

    await this.locationRepository.delete(property.id_ubicacion);
  }
}
