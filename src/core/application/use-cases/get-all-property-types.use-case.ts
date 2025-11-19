import { Inject, Injectable } from '@nestjs/common';
import type { IPropertyTypeRepository } from 'src/core/domain/ports/property-type.repository';
import { PROPERTY_TYPE_REPOSITORY } from 'src/core/domain/ports/property-type.repository';
import { PropertyType } from 'src/core/domain/entities/property-type.entity';

@Injectable()
export class GetAllPropertyTypesUseCase {
  constructor(
    @Inject(PROPERTY_TYPE_REPOSITORY)
    private readonly propertyTypeRepository: IPropertyTypeRepository,
  ) {}

  async execute(): Promise<PropertyType[]> {
    return this.propertyTypeRepository.findAll();
  }
}
