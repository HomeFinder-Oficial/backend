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
      activo: prismaUser.activo === null ? true : prismaUser.activo,
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

  async create(data: Partial<User>): Promise<User> {
    const createdUser = await this.prisma.usuario.create({
      data: {
        nombre: data.nombre!,
        apellidos: data.apellidos!,
        email: data.email!,
        contrasena: data.contrasena!,
        activo: data.activo ?? true,
        telefono: data.telefono ?? null,
        id_rol: data.id_rol ?? null,
        foto: data.foto ?? null,
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

  async findAll(page: number, limit: number): Promise<User[]> {
    const skip = (page - 1) * limit;
    const users = await this.prisma.usuario.findMany({
      skip,
      take: limit,
      orderBy: { nombre: 'asc' },
    });
    return users.map(this.mapPrismaUserToEntity);
  }

  async count(): Promise<number> {
    return this.prisma.usuario.count();
  }



  async update(id: string, data: Partial<User>): Promise<User> {
    const updated = await this.prisma.usuario.update({
      where: { id },
      data,
    });
    return new User(updated as any);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.usuario.delete({ where: { id } });
  }
}
