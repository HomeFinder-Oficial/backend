import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { IPropertyRepository } from 'src/core/domain/ports/property.repository';
import { Property } from 'src/core/domain/entities/property.entity';
import { FilterPropertyDto } from 'src/core/application/dto/filter-property.dto';
import { PropertyMapper } from 'src/core/application/mappers/propertyMapper';

@Injectable()
export class PrismaPropertyRepository implements IPropertyRepository {
  constructor(private readonly prisma: PrismaService) { }

  async findAll(): Promise<Property[]> {
    const properties = await this.prisma.property.findMany({
      where: { active: true },
      include: {
        property_type: true,
        location: true,
        property_photo: { orderBy: { number: 'asc' } },
      },
      orderBy: { id: 'desc' },
    });
    return properties.map(PropertyMapper.toDomain);
  }

  async findById(id: string): Promise<Property | null> {
    const property = await this.prisma.property.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, first_name: true, last_name: true, email: true, phone: true, photo: true } },
        property_type: true,
        location: true,
        property_photo: { orderBy: { number: 'asc' } },
      },
    });
    return property ? PropertyMapper.toDomain(property) : null;
  }

  /**
   * Este método ya no se usa en la creación, pero lo mantenemos
   * para cumplir con la interfaz y permitir posibles usos futuros.
   */
  async create(): Promise<Property> {
    throw new Error('Method not implemented: use CreatePropertyUseCase instead.');
  }

  async update(id: string, data: Partial<Property>): Promise<Property> {
    const updated = await this.prisma.property.update({
      where: { id },
      data: PropertyMapper.toPersistence(data),
      include: {
        user: { select: { id: true, first_name: true, last_name: true, email: true, phone: true, photo: true } },
        property_type: true,
        location: true,
        property_photo: { orderBy: { number: 'asc' } },
      },
    });

    return PropertyMapper.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.property.update({
      where: { id },
      data: { active: false },
    });
  }

  async searchWithFilters(
    filters: FilterPropertyDto,
    skip: number,
    limit: number,
  ): Promise<{ data: Property[]; total: number }> {
    const where: any = { active: true };

    if (filters.location) where.location = { city: { contains: filters.location, mode: 'insensitive' } };
    if (filters.minPrice || filters.maxPrice) {
      where.price = {};
      if (filters.minPrice) where.price.gte = filters.minPrice;
      if (filters.maxPrice) where.price.lte = filters.maxPrice;
    }
    if (filters.bedrooms) where.bedrooms = filters.bedrooms;
    if (filters.type) where.property_type = { type: { contains: filters.type, mode: 'insensitive' } };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.property.findMany({
        where,
        skip,
        take: limit,
        include: {
          user: { select: { id: true, first_name: true, last_name: true, email: true, phone: true, photo: true } },
          property_type: true,
          location: true,
          property_photo: { orderBy: { number: 'asc' } },
        },
        orderBy: { id: 'desc' },
      }),
      this.prisma.property.count({ where }),
    ]);

    return { data: data.map(PropertyMapper.toDomain), total };
  }
}
