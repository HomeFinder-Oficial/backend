import { Role } from '../entities/role.entity';

export interface IRoleRepository {
  findAll(): Promise<Role[]>;
  findById(id: string): Promise<Role | null>;
}

export const ROLE_REPOSITORY = 'ROLE_REPOSITORY';
