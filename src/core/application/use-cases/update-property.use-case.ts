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
    private readonly imageRepository: IPropertyImageRepository,
  ) { }

  async execute(
    propertyId: string,
    dto: UpdatePropertyDto,
    userId: string,
  ): Promise<Property> {
    const property = await this.propertyRepository.findById(propertyId);
    if (!property) {
      throw new NotFoundException('Property not found');
    }

    if (!property.belongsTo(userId)) {
      throw new ForbiddenException('You are not allowed to update this property');
    }

    if (dto.location) {
      await this.locationRepository.update(property.location_id, {
        address: dto.location.address,
        city: dto.location.city,
        neighborhood: dto.location.neighborhood,
        latitude: dto.location.latitude,
        longitude: dto.location.longitude,
      });
    }

    if (dto.images !== undefined) {
      await this.imageRepository.deleteByProperty(propertyId);

      if (dto.images.length > 0) {
        for (let i = 0; i < dto.images.length; i++) {
          await this.imageRepository.create({
            property_id: propertyId,
            url: dto.images[i],
            number: i + 1,
          });
        }
      }
    }

    if (dto.property_type_id) {
      const typeExists = await this.propertyTypeRepository.findById(
        dto.property_type_id,
      );
      if (!typeExists) {
        throw new NotFoundException('Property type not found');
      }
    }

    const updatedProperty = await this.propertyRepository.update(propertyId, {
      title: dto.title,
      description: dto.description,
      price: dto.price,
      area_m2: dto.area_m2,
      bedrooms: dto.bedrooms,
      bathrooms: dto.bathrooms,
      property_type_id: dto.property_type_id,
    });

    return updatedProperty;
  }
}