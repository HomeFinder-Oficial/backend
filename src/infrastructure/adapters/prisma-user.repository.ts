import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { IUserRepository } from '../../core/domain/ports/user.repository';
import { User } from '../../core/domain/entities/user.entity';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  private mapPrismaUserToEntity(prismaUser: any): User {
    return new User({
      id: prismaUser.id,
      nombre: prismaUser.nombre,
      apellidos: prismaUser.apellidos,
      email: prismaUser.email,
      contrasena: prismaUser.contrasena,
      activo: prismaUser.activo ?? true,
      telefono: prismaUser.telefono ?? undefined,
      id_rol: prismaUser.id_rol ?? undefined,
      foto: prismaUser.foto ?? undefined,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.usuario.findUnique({
      where: { email },
    });
    return user ? this.mapPrismaUserToEntity(user) : null;
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.usuario.findUnique({
      where: { id },
    });
    return user ? this.mapPrismaUserToEntity(user) : null;
  }

  async create(usuario: Partial<User>): Promise<User> {
    const createdUser = await this.prisma.usuario.create({
      data: {
        nombre: usuario.nombre!,
        apellidos: usuario.apellidos!,
        email: usuario.email!,
        contrasena: usuario.contrasena!,
        activo: usuario.activo ?? true,
        telefono: usuario.telefono ?? null,
        id_rol: usuario.id_rol ?? null,
        foto: usuario.foto ?? null,
      },
    });
    return this.mapPrismaUserToEntity(createdUser);
  }

  async existsByEmail(email: string): Promise<boolean> {
    const count = await this.prisma.usuario.count({
      where: { email },
    });
    return count > 0;
  }
}
