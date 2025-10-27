import type { Favorito } from '../entities/favorito.entity';

export interface IFavoritoRepository {
  addFavorite(userId: string, propertyId: string): Promise<Favorito>;
  removeFavorite(userId: string, propertyId: string): Promise<void>;
  getFavoritesByUser(userId: string): Promise<Favorito[]>;
  isFavorite(userId: string, propertyId: string): Promise<boolean>;
}

export const FAVORITO_REPOSITORY = 'FAVORITO_REPOSITORY';
