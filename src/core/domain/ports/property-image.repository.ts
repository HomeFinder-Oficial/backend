import { PropertyImage } from '../entities/property-image.entity';

export interface IPropertyImageRepository {
  findByProperty(propertyId: string): Promise<PropertyImage[]>;
  create(foto: Partial<PropertyImage>): Promise<PropertyImage>;
  deleteByProperty(propertyId: string): Promise<void>;
  delete(id: string): Promise<void>;
}

export const PROPERTY_IMAGE_REPOSITORY = 'PROPERTY_IMAGE_REPOSITORY';
