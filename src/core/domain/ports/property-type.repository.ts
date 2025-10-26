import { PropertyType } from '../entities/property-type.entity';

export interface IPropertyTypeRepository {
  findAll(): Promise<PropertyType[]>;
  findById(id: string): Promise<PropertyType | null>;
}

export const PROPERTY_TYPE_REPOSITORY = 'PROPERTY_TYPE_REPOSITORY';
