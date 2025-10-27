import { FilterPropertyDto } from 'src/core/application/dto/filter-property.dto';
import { Property } from '../entities/property.entity';

export interface IPropertyRepository {
  findAll(): Promise<Property[]>;
  findById(id: string): Promise<Property | null>;
  create(data: Partial<Property>): Promise<Property>;
  update(id: string, data: Partial<Property>): Promise<Property>;
  delete(id: string): Promise<void>;
  searchWithFilters(
    filters: FilterPropertyDto,
    skip: number,
    limit: number,
  ): Promise<{ data: Property[]; total: number }>;
}

export const PROPERTY_REPOSITORY = 'PROPERTY_REPOSITORY';
