import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { ILocationRepository } from 'src/core/domain/ports/location.repository';
import { Location } from 'src/core/domain/entities/location.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PrismaLocationRepository implements ILocationRepository {
  constructor(private readonly prisma: PrismaService) {}

  private mapPrismaLocationToEntity(prismaLocation: any): Location {
    return new Location({
      id: prismaLocation.id,
      address: prismaLocation.address ?? undefined,
      city: prismaLocation.city ?? undefined,
      neighborhood: prismaLocation.neighborhood ?? undefined,
      latitude: prismaLocation.latitude
        ? Number(prismaLocation.latitude)
        : undefined,
      longitude: prismaLocation.longitude
        ? Number(prismaLocation.longitude)
        : undefined,
      active: prismaLocation.active === null ? true : prismaLocation.active,
    });
  }

  async create(data: Partial<Location>): Promise<Location> {
    const created = await this.prisma.location.create({
      data: {
        id: data.id ?? uuidv4(),
        address: data.address ?? null,
        city: data.city ?? null,
        neighborhood: data.neighborhood ?? null,
        latitude: data.latitude ?? null,
        longitude: data.longitude ?? null,
        active: data.active ?? true,
      },
    });
    return this.mapPrismaLocationToEntity(created);
  }

  async update(id: string, data: Partial<Location>): Promise<Location> {
    const updated = await this.prisma.location.update({
      where: { id },
      data: {
        address: data.address,
        city: data.city,
        neighborhood: data.neighborhood,
        latitude: data.latitude,
        longitude: data.longitude,
        active: data.active,
      },
    });
    return this.mapPrismaLocationToEntity(updated);
  }

  async findById(id: string): Promise<Location | null> {
    const location = await this.prisma.location.findUnique({
      where: { id },
    });
    return location ? this.mapPrismaLocationToEntity(location) : null;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.location.update({
      where: { id },
      data: { active: false },
    });
  }
}
