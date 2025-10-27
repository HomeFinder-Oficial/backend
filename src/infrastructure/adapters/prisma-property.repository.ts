import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { IPropertyRepository } from 'src/core/domain/ports/property.repository';
import { Property } from 'src/core/domain/entities/property.entity';
import { FilterPropertyDto } from 'src/core/application/dto/filter-property.dto';

@Injectable()
export class PrismaPropertyRepository implements IPropertyRepository {
  constructor(private readonly prisma: PrismaService) { }

  private mapPrismaPropertyToEntity(prismaProperty: any): Property {
    return new Property({
      id: prismaProperty.id,
      titulo: prismaProperty.titulo,
      descripcion: prismaProperty.descripcion ?? undefined,
      precio: prismaProperty.precio ?? undefined,
      area_m2: prismaProperty.area_m2 ?? undefined,
      habitaciones: prismaProperty.habitaciones ?? undefined,
      banos: prismaProperty.banos ?? undefined,
      activo: prismaProperty.activo === null ? true : prismaProperty.activo,
      id_propietario: prismaProperty.id_propietario,
      id_tipo_inmueble: prismaProperty.id_tipo_inmueble,
      id_ubicacion: prismaProperty.id_ubicacion,
      propietario: prismaProperty.propietario,
      tipoInmueble: prismaProperty.tipoInmueble,
      ubicacion: prismaProperty.ubicacion,
      fotos: prismaProperty.fotos,
    });
  }

  async findAll(): Promise<Property[]> {
    const properties = await this.prisma.inmueble.findMany({
      where: { activo: true },
      include: {
        propietario: {
          select: {
            id: true,
            nombre: true,
            apellidos: true,
            email: true,
            telefono: true,
          },
        },
        tipoInmueble: true,
        ubicacion: true,
        fotos: {
          orderBy: { numero: 'asc' },
        },
      },
      orderBy: { id: 'desc' },
    });
    return properties.map((i) => this.mapPrismaPropertyToEntity(i));
  }

  async findById(id: string): Promise<Property | null> {
    const property = await this.prisma.inmueble.findUnique({
      where: { id },
      include: {
        propietario: {
          select: {
            id: true,
            nombre: true,
            apellidos: true,
            email: true,
            telefono: true,
          },
        },
        tipoInmueble: true,
        ubicacion: true,
        fotos: {
          orderBy: { numero: 'asc' },
        },
      },
    });
    return property ? this.mapPrismaPropertyToEntity(property) : null;
  }

  async create(data: Partial<Property>): Promise<Property> {
    const created = await this.prisma.inmueble.create({
      data: {
        titulo: data.titulo!,
        descripcion: data.descripcion ?? null,
        precio: data.precio ?? null,
        area_m2: data.area_m2 ?? null,
        habitaciones: data.habitaciones ?? null,
        banos: data.banos ?? null,
        activo: data.activo ?? true,
        id_propietario: data.id_propietario!,
        id_tipo_inmueble: data.id_tipo_inmueble!,
        id_ubicacion: data.id_ubicacion!,
      },
      include: {
        propietario: {
          select: {
            id: true,
            nombre: true,
            apellidos: true,
            email: true,
          },
        },
        tipoInmueble: true,
        ubicacion: true,
        fotos: true,
      },
    });
    return this.mapPrismaPropertyToEntity(created);
  }

  async update(id: string, data: Partial<Property>): Promise<Property> {
    const updated = await this.prisma.inmueble.update({
      where: { id },
      data: {
        titulo: data.titulo,
        descripcion: data.descripcion,
        precio: data.precio,
        area_m2: data.area_m2,
        habitaciones: data.habitaciones,
        banos: data.banos,
        activo: data.activo,
        id_tipo_inmueble: data.id_tipo_inmueble,
      },
      include: {
        propietario: {
          select: {
            id: true,
            nombre: true,
            apellidos: true,
            email: true,
          },
        },
        tipoInmueble: true,
        ubicacion: true,
        fotos: {
          orderBy: { numero: 'asc' },
        },
      },
    });
    return this.mapPrismaPropertyToEntity(updated);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.inmueble.update({
      where: { id },
      data: { activo: false },
    });
  }


  async searchWithFilters(
    filters: FilterPropertyDto,
    skip: number,
    limit: number,
  ): Promise<{ data: Property[]; total: number }> {
    const where: any = { activo: true };

    // 🔍 Filtros dinámicos
    if (filters.ubicacion) {
      where.ubicacion = {
        ciudad: { contains: filters.ubicacion },
      };
    }
    if (filters.minPrecio || filters.maxPrecio) {
      where.precio = {};
      if (filters.minPrecio) where.precio.gte = filters.minPrecio;
      if (filters.maxPrecio) where.precio.lte = filters.maxPrecio;
    }
    if (filters.habitaciones) {
      where.habitaciones = filters.habitaciones;
    }
    if (filters.tipo) {
      where.tipoInmueble = {
        tipo: { contains: filters.tipo },
      };
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.inmueble.findMany({
        where,
        skip,
        take: limit,
        include: {
          propietario: {
            select: {
              id: true,
              nombre: true,
              apellidos: true,
              email: true,
              telefono: true,
            },
          },
          tipoInmueble: true,
          ubicacion: true,
          fotos: { orderBy: { numero: 'asc' } },
        },
        orderBy: { id: 'desc' },
      }),
      this.prisma.inmueble.count({ where }),
    ]);

    return {
      data: data.map((i) => this.mapPrismaPropertyToEntity(i)),
      total,
    };
  }
}
