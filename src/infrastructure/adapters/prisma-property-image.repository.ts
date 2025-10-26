import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { IPropertyImageRepository } from 'src/core/domain/ports/property-image.repository';
import { PropertyImage } from 'src/core/domain/entities/property-image.entity';

@Injectable()
export class PrismaPropertyImageRepository implements IPropertyImageRepository {
  constructor(private readonly prisma: PrismaService) {}

  private mapPrismaPropertyImageToEntity(prismaImage: any): PropertyImage {
    return new PropertyImage({
      id: prismaImage.id,
      id_inmueble: prismaImage.id_inmueble,
      url: prismaImage.url,
      numero: prismaImage.numero ?? undefined,
      activo: prismaImage.activo === null ? true : prismaImage.activo,
    });
  }

  async findByProperty(id_inmueble: string): Promise<PropertyImage[]> {
    const fotos = await this.prisma.fotoInmueble.findMany({
      where: { id_inmueble },
      orderBy: { numero: 'asc' },
    });
    return fotos.map((f) => this.mapPrismaPropertyImageToEntity(f));
  }

  async create(data: Partial<PropertyImage>): Promise<PropertyImage> {
    const created = await this.prisma.fotoInmueble.create({
      data: {
        id_inmueble: data.id_inmueble!,
        url: data.url!,
        numero: data.numero ?? null,
        activo: data.activo ?? true,
      },
    });
    return this.mapPrismaPropertyImageToEntity(created);
  }

  async deleteByProperty(id_inmueble: string): Promise<void> {
    await this.prisma.fotoInmueble.deleteMany({
      where: { id_inmueble },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.fotoInmueble.delete({ where: { id } });
  }
}
