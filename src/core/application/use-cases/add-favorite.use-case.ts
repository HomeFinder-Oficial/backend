import { Inject, Injectable } from '@nestjs/common';
import type { IFavoritoRepository } from '../../domain/ports/favorite.repository';
import { FAVORITO_REPOSITORY } from '../../domain/ports/favorite.repository';
import type { Favorito } from 'src/core/domain/entities/favorito.entity';

@Injectable()
export class AddFavoritoUseCase {
    constructor(
        @Inject(FAVORITO_REPOSITORY)
        private readonly favoritoRepo: IFavoritoRepository,
    ) { }

    async execute(userId: string, propertyId: string): Promise<Favorito> {
        const exists = await this.favoritoRepo.isFavorite(userId, propertyId);
        if (exists) {
            throw new Error('La propiedad ya está en favoritos.');
        }
        return this.favoritoRepo.addFavorite(userId, propertyId);
    }
}
