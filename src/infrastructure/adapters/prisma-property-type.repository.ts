import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { IPropertyTypeRepository } from 'src/core/domain/ports/property-type.repository';
import { PropertyType } from 'src/core/domain/entities/property-type.entity';

@Injectable()
export class PrismaPropertyTypeRepository implements IPropertyTypeRepository {
  constructor(private readonly prisma: PrismaService) {}

  private mapPrismaPropertyTypeToEntity(prismaType: any): PropertyType {
    return new PropertyType({
      id: prismaType.id,
      tipo: prismaType.tipo,
      activo: prismaType.activo === null ? true : prismaType.activo,
    });
  }

  async findAll(): Promise<PropertyType[]> {
    const types = await this.prisma.tipoInmueble.findMany();
    return types.map((t) => this.mapPrismaPropertyTypeToEntity(t));
  }

  async findById(id: string): Promise<PropertyType | null> {
    const type = await this.prisma.tipoInmueble.findUnique({
      where: { id },
    });
    return type ? this.mapPrismaPropertyTypeToEntity(type) : null;
  }
}
