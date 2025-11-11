import { Injectable } from '@nestjs/common';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { Property } from 'src/core/domain/entities/property.entity';
import { PropertyMapper } from '../mappers/propertyMapper';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from 'src/infrastructure/database/prisma.service';

@Injectable()
export class CreatePropertyUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(dto: CreatePropertyDto, ownerId: string): Promise<Property> {
    return this.prisma.$transaction(async (tx) => {
      // 1️⃣ Crear ubicación
      const location = dto.location
        ? await tx.location.create({
            data: {
              id: uuidv4(),
              address: dto.location.address ?? null,
              city: dto.location.city ?? null,
              neighborhood: dto.location.neighborhood ?? null,
              latitude: dto.location.latitude ?? null,
              longitude: dto.location.longitude ?? null,
              active: true,
            },
          })
        : null;

      // 2️⃣ Crear o reutilizar tipo de propiedad
      const propertyType =
        (await tx.property_type.findFirst({
          where: { type: dto.property_type, active: true },
        })) ||
        (await tx.property_type.create({
          data: { id: uuidv4(), type: dto.property_type, active: true },
        }));

      // 3️⃣ Crear propiedad principal (incluye type_of_sale)
      const property = await tx.property.create({
        data: {
          id: uuidv4(),
          title: dto.title,
          description: dto.description ?? null,
          price: dto.price ?? null,
          area_m2: dto.area_m2 ?? null,
          bedrooms: dto.bedrooms ?? null,
          bathrooms: dto.bathrooms ?? null,
          active: true,
          id_owner: ownerId,
          property_type_id: propertyType.id,
          location_id: location?.id!,
          type_of_sale: dto.type_of_sale ?? null,
        },
      });

      // 4️⃣ Crear fotos
      if (dto.images?.length) {
        await tx.property_photo.createMany({
          data: dto.images.map((url, index) => ({
            id: uuidv4(),
            property_id: property.id,
            url,
            number: index + 1,
            active: true,
          })),
        });
      }

      // 5️⃣ Consultar y retornar la propiedad completa
      const fullProperty = await tx.property.findUnique({
        where: { id: property.id },
        include: {
          property_type: true,
          location: true,
          property_photo: { orderBy: { number: 'asc' } },
        },
      });

      return PropertyMapper.toDomain(fullProperty!);
    });
  }
}
