import { Inject, Injectable } from '@nestjs/common';
import type { IFavoriteRepository } from '../../domain/ports/favorite.repository';
import { FAVORITE_REPOSITORY } from '../../domain/ports/favorite.repository';

@Injectable()
export class RemoveFavoriteUseCase {
  constructor(
    @Inject(FAVORITE_REPOSITORY)
    private readonly favoriteRepo: IFavoriteRepository,
  ) {}

  async execute(userId: string, propertyId: string): Promise<void> {
    const exists = await this.favoriteRepo.isFavorite(userId, propertyId);
    if (!exists) {
      throw new Error('El favorito no existe o ya fue eliminado.');
    }

    await this.favoriteRepo.removeFavorite(userId, propertyId);
  }
}
