import { Inject, Injectable } from '@nestjs/common';
import type { IFavoriteRepository } from '../../domain/ports/favorite.repository';
import { FAVORITE_REPOSITORY } from '../../domain/ports/favorite.repository';
import type { Favorite } from 'src/core/domain/entities/favorite.entity';

@Injectable()
export class GetUserFavoritesUseCase {
  constructor(
    @Inject(FAVORITE_REPOSITORY)
    private readonly favoriteRepo: IFavoriteRepository,
  ) {}

  async execute(userId: string): Promise<Favorite[]> {
    return this.favoriteRepo.getFavoritesByUser(userId);
  }
}
