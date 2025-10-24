import { User } from '../entities/user.entity';

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  create(user: Partial<User>): Promise<User>;
  existsByEmail(email: string): Promise<boolean>;
}

export const USER_REPOSITORY = 'USER_REPOSITORY';
