import { Inject, Injectable } from '@nestjs/common';
import type { IPropertyRepository } from 'src/core/domain/ports/property.repository';
import { PROPERTY_REPOSITORY } from 'src/core/domain/ports/property.repository';
import { Property } from 'src/core/domain/entities/property.entity';

@Injectable()
export class GetAllPropertiesUseCase {
  constructor(
    @Inject(PROPERTY_REPOSITORY)
    private readonly propertyRepository: IPropertyRepository,
  ) {}

  async execute(): Promise<Property[]> {
    return this.propertyRepository.findAll();
  }
}
