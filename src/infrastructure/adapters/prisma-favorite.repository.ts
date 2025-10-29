import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import type { IFavoritoRepository } from '../../core/domain/ports/favorite.repository';
import { Favorito } from '../../core/domain/entities/favorito.entity';

@Injectable()
export class PrismaFavoritoRepository implements IFavoritoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async addFavorite(userId: string, propertyId: string): Promise<Favorito> {
    const favorito = await this.prisma.favorito.create({
      data: {
        id_cliente: userId,
        id_inmueble: propertyId,
        activo: true,
      },
    });

    return new Favorito({
      id: favorito.id,
      id_cliente: favorito.id_cliente,
      id_inmueble: favorito.id_inmueble,
      activo: favorito.activo ?? true,
    });
  }

  
  async removeFavorite(userId: string, propertyId: string): Promise<void> {
    await this.prisma.favorito.updateMany({
      where: {
        id_cliente: userId,
        id_inmueble: propertyId,
        activo: true,
      },
      data: {
        activo: false,
      },
    });
  }

  async getFavoritesByUser(userId: string): Promise<Favorito[]> {
    const favoritos = await this.prisma.favorito.findMany({
      where: { id_cliente: userId, activo: true },
      include: {
        inmueble: {
          include: {
            tipoInmueble: true,
            ubicacion: true,
            fotos: true,
          },
        },
      },
    });

    return favoritos.map((fav) => new Favorito({
      id: fav.id,
      id_cliente: fav.id_cliente,
      id_inmueble: fav.id_inmueble,
      activo: fav.activo ?? true,
    }));
  }

  async isFavorite(userId: string, propertyId: string): Promise<boolean> {
    const count = await this.prisma.favorito.count({
      where: { id_cliente: userId, id_inmueble: propertyId, activo: true },
    });
    return count > 0;
  }
}
