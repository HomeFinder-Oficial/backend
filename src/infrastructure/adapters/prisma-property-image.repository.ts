import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { IPropertyImageRepository } from 'src/core/domain/ports/property-image.repository';
import { PropertyImage } from 'src/core/domain/entities/property-image.entity';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class PrismaPropertyImageRepository implements IPropertyImageRepository {
  constructor(private readonly prisma: PrismaService) { }

  private mapPrismaPropertyImageToEntity(prismaImage: any): PropertyImage {
    return new PropertyImage({
      id: prismaImage.id,
      property_id: prismaImage.property_id,
      url: prismaImage.url,
      number: prismaImage.number ?? null,
      active: prismaImage.active ?? true,
    });
  }

  async findByProperty(property_id: string): Promise<PropertyImage[]> {
    const photos = await this.prisma.property_photo.findMany({
      where: { property_id },
      orderBy: { number: 'asc' },
    });
    return photos.map((p) => this.mapPrismaPropertyImageToEntity(p));
  }

  async create(data: Partial<PropertyImage>): Promise<PropertyImage> {
    const created = await this.prisma.property_photo.create({
      data: {
        id: data.id ?? uuidv4(),
        property_id: data.property_id!,
        url: data.url!,
        number: data.number ?? null,
        active: data.active ?? true,
      },
    });
    return this.mapPrismaPropertyImageToEntity(created);
  }

  async deleteByProperty(property_id: string): Promise<void> {
    await this.prisma.property_photo.deleteMany({
      where: { property_id },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.property_photo.delete({ where: { id } });
  }
}
