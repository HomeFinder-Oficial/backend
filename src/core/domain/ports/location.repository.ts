import { Location } from '../entities/location.entity';

export interface ILocationRepository {
  create(data: Partial<Location>): Promise<Location>;
  update(id: string, data: Partial<Location>): Promise<Location>;
  findById(id: string): Promise<Location | null>;
  delete(id: string): Promise<void>;
}

export const LOCATION_REPOSITORY = 'LOCATION_REPOSITORY';
