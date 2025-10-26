import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { ILocationRepository } from 'src/core/domain/ports/location.repository';
import { Location } from 'src/core/domain/entities/location.entity';

@Injectable()
export class PrismaLocationRepository implements ILocationRepository {
  constructor(private readonly prisma: PrismaService) {}

  private mapPrismaLocationToEntity(prismaLocation: any): Location {
    return new Location({
      id: prismaLocation.id,
      direccion: prismaLocation.direccion ?? undefined,
      ciudad: prismaLocation.ciudad ?? undefined,
      barrio: prismaLocation.barrio ?? undefined,
      latitud: prismaLocation.latitud ?? undefined,
      longitud: prismaLocation.longitud ?? undefined,
      activo: prismaLocation.activo === null ? true : prismaLocation.activo,
    });
  }

  async create(data: Partial<Location>): Promise<Location> {
    const created = await this.prisma.ubicacion.create({
      data: {
        direccion: data.direccion ?? null,
        ciudad: data.ciudad ?? null,
        barrio: data.barrio ?? null,
        latitud: data.latitud ?? null,
        longitud: data.longitud ?? null,
        activo: data.activo ?? true,
      },
    });
    return this.mapPrismaLocationToEntity(created);
  }

  async update(id: string, data: Partial<Location>): Promise<Location> {
    const updated = await this.prisma.ubicacion.update({
      where: { id },
      data: {
        direccion: data.direccion,
        ciudad: data.ciudad,
        barrio: data.barrio,
        latitud: data.latitud,
        longitud: data.longitud,
        activo: data.activo,
      },
    });
    return this.mapPrismaLocationToEntity(updated);
  }

  async findById(id: string): Promise<Location | null> {
    const location = await this.prisma.ubicacion.findUnique({
      where: { id },
    });
    return location ? this.mapPrismaLocationToEntity(location) : null;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.ubicacion.delete({ where: { id } });
  }
}
