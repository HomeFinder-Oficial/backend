import { Inject, Injectable } from '@nestjs/common';
import type { IFavoriteRepository } from '../../domain/ports/favorite.repository';
import { FAVORITE_REPOSITORY } from '../../domain/ports/favorite.repository';
import type { Favorite } from 'src/core/domain/entities/favorite.entity';

@Injectable()
export class AddFavoriteUseCase {
    constructor(
        @Inject(FAVORITE_REPOSITORY)
        private readonly favoriteRepo: IFavoriteRepository,
    ) { }

    async execute(userId: string, propertyId: string): Promise<Favorite> {
        const exists = await this.favoriteRepo.isFavorite(userId, propertyId);
        if (exists) {
            throw new Error('La propiedad ya está en favoritos.');
        }
        return this.favoriteRepo.addFavorite(userId, propertyId);
    }
}
