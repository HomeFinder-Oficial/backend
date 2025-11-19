import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { IRoleRepository } from 'src/core/domain/ports/role.repository';
import { Role } from 'src/core/domain/entities/role.entity';

@Injectable()
export class PrismaRoleRepository implements IRoleRepository {
  constructor(private readonly prisma: PrismaService) {}

  private mapPrismaRoleToEntity(prismaRole: any): Role {
    return new Role({
      id: prismaRole.id,
      name: prismaRole.name,
      active: prismaRole.active === null ? true : prismaRole.active,
    });
  }

  async findAll(): Promise<Role[]> {
    const roles = await this.prisma.role.findMany();
    return roles.map((r) => this.mapPrismaRoleToEntity(r));
  }

  async findById(id: string): Promise<Role | null> {
    const role = await this.prisma.role.findUnique({
      where: { id },
    });
    return role ? this.mapPrismaRoleToEntity(role) : null;
  }
}
