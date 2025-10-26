import { Property } from '../entities/property.entity';

export interface IPropertyRepository {
  findAll(): Promise<Property[]>;
  findById(id: string): Promise<Property | null>;
  create(data: Partial<Property>): Promise<Property>;
  update(id: string, data: Partial<Property>): Promise<Property>;
  delete(id: string): Promise<void>;
}

export const PROPERTY_REPOSITORY = 'PROPERTY_REPOSITORY';
