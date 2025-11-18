import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import type { IFavoriteRepository } from '../../core/domain/ports/favorite.repository';
import { Favorite } from '../../core/domain/entities/favorite.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PrismaFavoriteRepository implements IFavoriteRepository {
  constructor(private readonly prisma: PrismaService) {}

  async addFavorite(userId: string, propertyId: string): Promise<Favorite> {
    const favorite = await this.prisma.favorite.create({
      data: {
        id: uuidv4(),
        client_id: userId,
        property_id: propertyId,
        active: true,
      },
    });

    return new Favorite({
      id: favorite.id,
      client_id: favorite.client_id,
      property_id: favorite.property_id,
      active: favorite.active ?? true,
    });
  }

  async removeFavorite(userId: string, propertyId: string): Promise<void> {
    await this.prisma.favorite.updateMany({
      where: {
        client_id: userId,
        property_id: propertyId,
        active: true,
      },
      data: {
        active: false,
      },
    });
  }

  async getFavoritesByUser(userId: string): Promise<Favorite[]> {
    const favorites = await this.prisma.favorite.findMany({
      where: { client_id: userId, active: true },
      include: {
        property: {
          include: {
            property_type: true,
            location: true,
            property_photo: true,
          },
        },
      },
    });

    return favorites.map(
      (fav) =>
        new Favorite({
          id: fav.id,
          client_id: fav.client_id,
          property_id: fav.property_id,
          active: fav.active ?? true,
        }),
    );
  }

  async isFavorite(userId: string, propertyId: string): Promise<boolean> {
    const count = await this.prisma.favorite.count({
      where: {
        client_id: userId,
        property_id: propertyId,
        active: true,
      },
    });
    return count > 0;
  }
}
