import type { Favorite } from '../entities/favorite.entity';

export interface IFavoriteRepository {
  addFavorite(userId: string, propertyId: string): Promise<Favorite>;
  removeFavorite(userId: string, propertyId: string): Promise<void>;
  getFavoritesByUser(userId: string): Promise<Favorite[]>;
  isFavorite(userId: string, propertyId: string): Promise<boolean>;
}

export const FAVORITE_REPOSITORY = 'FAVORITE_REPOSITORY';
