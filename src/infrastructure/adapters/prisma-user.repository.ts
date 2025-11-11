import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { IUserRepository } from '../../core/domain/ports/user.repository';
import { User } from '../../core/domain/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { UserMapper } from 'src/core/application/mappers/user.mapper';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) { }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return user ? UserMapper.toDomain(user) : null;
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return user ? UserMapper.toDomain(user) : null;
  }

  async create(data: Partial<User>): Promise<User> {
    const userToPersist = UserMapper.toPersistence({
      ...data,
      id: data.id ?? uuidv4(),
    });

    const createdUser = await this.prisma.user.create({
      data: userToPersist,
    });

    return UserMapper.toDomain(createdUser);
  }

  async existsByEmail(email: string): Promise<boolean> {
    const count = await this.prisma.user.count({
      where: { email },
    });
    return count > 0;
  }

  async findAll(page: number, limit: number): Promise<User[]> {
    const skip = (page - 1) * limit;
    const users = await this.prisma.user.findMany({
      where: { active: true },
      skip,
      take: limit,
      orderBy: { first_name: 'asc' },
    });
    return users.map(UserMapper.toDomain);
  }

  async count(): Promise<number> {
    return this.prisma.user.count();
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const userToUpdate = UserMapper.toPersistence(data);

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: userToUpdate,
    });

    return UserMapper.toDomain(updatedUser);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: { active: false },
    });
  }
}
