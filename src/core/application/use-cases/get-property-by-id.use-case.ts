import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { IPropertyRepository } from 'src/core/domain/ports/property.repository';
import { PROPERTY_REPOSITORY } from 'src/core/domain/ports/property.repository';
import { Property } from 'src/core/domain/entities/property.entity';

@Injectable()
export class GetPropertyByIdUseCase {
  constructor(
    @Inject(PROPERTY_REPOSITORY)
    private readonly propertyRepository: IPropertyRepository,
  ) {}

  async execute(id: string): Promise<Property> {
    const property = await this.propertyRepository.findById(id);
    if (!property) {
      throw new NotFoundException('Inmueble no encontrado');
    }
    return property;
  }
}
