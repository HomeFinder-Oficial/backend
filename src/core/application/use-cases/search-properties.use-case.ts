import { Inject, Injectable } from '@nestjs/common';
import {
  PROPERTY_REPOSITORY,
  type IPropertyRepository,
} from 'src/core/domain/ports/property.repository';
import type { Property } from 'src/core/domain/entities/property.entity';
import type { FilterPropertyDto } from '../dto/filter-property.dto';

@Injectable()
export class SearchPropertiesUseCase {
  constructor(
    @Inject(PROPERTY_REPOSITORY)
    private readonly propertyRepository: IPropertyRepository,
  ) {}

  async execute(filters: FilterPropertyDto): Promise<{
    data: Property[];
    total: number;
    page: number;
    limit: number;
  }> {
    const page = filters.page ?? 1;
    const limit = filters.limit ?? 10;
    const skip = (page - 1) * limit;

    const { data, total } = await this.propertyRepository.searchWithFilters(
      filters,
      skip,
      limit,
    );

    return { data, total, page, limit };
  }
}
