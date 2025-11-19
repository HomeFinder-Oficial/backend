import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { IPropertyRepository } from 'src/core/domain/ports/property.repository';
import { PROPERTY_REPOSITORY } from 'src/core/domain/ports/property.repository';
import type { ILocationRepository } from 'src/core/domain/ports/location.repository';
import { LOCATION_REPOSITORY } from 'src/core/domain/ports/location.repository';
import type { IPropertyTypeRepository } from 'src/core/domain/ports/property-type.repository';
import { PROPERTY_TYPE_REPOSITORY } from 'src/core/domain/ports/property-type.repository';
import type { IPropertyImageRepository } from 'src/core/domain/ports/property-image.repository';
import { PROPERTY_IMAGE_REPOSITORY } from 'src/core/domain/ports/property-image.repository';
import { Property } from 'src/core/domain/entities/property.entity';
import { CreatePropertyDto } from '../dto/create-property.dto';

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
    private readonly imageRepository: IPropertyImageRepository,
  ) {}

  async execute(dto: CreatePropertyDto, ownerId: string): Promise<Property> {
    const typeExists = await this.propertyTypeRepository.findById(
      dto.property_type_id,
    );
    if (!typeExists) {
      throw new NotFoundException('Tipo de inmueble no encontrado');
    }

    const location = await this.locationRepository.create({
      address: dto.location?.address,
      city: dto.location?.city,
      neighborhood: dto.location?.neighborhood,
      latitude: dto.location?.latitude,
      longitude: dto.location?.longitude,
      active: true,
    });

    const property = await this.propertyRepository.create({
      title: dto.title,
      description: dto.description,
      price: dto.price,
      area_m2: dto.area_m2,
      bedrooms: dto.bedrooms,
      bathrooms: dto.bathrooms,
      type_of_sale: dto.type_of_sale,
      active: true,
      id_owner: ownerId,
      property_type_id: dto.property_type_id,
      location_id: location.id,
    });

    if (dto.images && dto.images.length > 0) {
      for (let i = 0; i < dto.images.length; i++) {
        await this.imageRepository.create({
          property_id: property.id,
          url: dto.images[i],
          number: i + 1,
        });
      }
    }

    const completeProperty = await this.propertyRepository.findById(
      property.id,
    );
    return completeProperty!;
  }
}
