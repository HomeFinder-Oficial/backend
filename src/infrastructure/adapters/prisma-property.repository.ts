import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { IPropertyRepository } from 'src/core/domain/ports/property.repository';
import { Property } from 'src/core/domain/entities/property.entity';
import { FilterPropertyDto } from 'src/core/application/dto/filter-property.dto';
import { v4 as uuidv4 } from 'uuid';
import { PropertyMapper } from 'src/core/application/mappers/property.mapper';

@Injectable()
export class PrismaPropertyRepository implements IPropertyRepository {
  constructor(private readonly prisma: PrismaService) { }

  async findAll(): Promise<Property[]> {
    const properties = await this.prisma.property.findMany({
      where: { active: true },
      include: {
        property_type: true,
        location: true,
        property_photo: { where: { active: true }, orderBy: { number: 'asc' } },
      },
      orderBy: { id: 'desc' },
    });
    return properties.map(PropertyMapper.toDomain);
  }

  async findById(id: string): Promise<Property | null> {
    const property = await this.prisma.property.findUnique({
      where: { id },
      include: {
        property_type: true,
        location: true,
        property_photo: { where: { active: true }, orderBy: { number: 'asc' } },
      },
    });
    return property ? PropertyMapper.toDomain(property) : null;
  }

  async create(data: Partial<Property>): Promise<Property> {
    const propertyToPersist = PropertyMapper.toPersistence({
      ...data,
      id: data.id ?? uuidv4(),
    });

    const created = await this.prisma.property.create({
      data: propertyToPersist,
      include: {
        property_type: true,
        location: true,
        property_photo: { orderBy: { number: 'asc' } },
      },
    });

    return PropertyMapper.toDomain(created);
  }

  async update(id: string, data: Partial<Property>): Promise<Property> {
    const updated = await this.prisma.property.update({
      where: { id },
      data: PropertyMapper.toPersistence(data),
      include: {
        property_type: true,
        location: true,
        property_photo: { where: { active: true }, orderBy: { number: 'asc' } },
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

    if (filters.location)
      where.location = {
        city: { contains: filters.location, mode: 'insensitive' },
      };

    if (filters.minPrice || filters.maxPrice) {
      where.price = {};
      if (filters.minPrice) where.price.gte = filters.minPrice;
      if (filters.maxPrice) where.price.lte = filters.maxPrice;
    }

    if (filters.bedrooms) where.bedrooms = filters.bedrooms;

    if (filters.type)
      where.property_type = {
        type: { contains: filters.type, mode: 'insensitive' },
      };

    if (filters.typeSale) {
      where.type_of_sale = filters.typeSale;
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.property.findMany({
        where,
        skip,
        take: limit,
        include: {
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
