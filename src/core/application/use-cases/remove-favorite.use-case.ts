import { Inject, Injectable } from '@nestjs/common';
import type { IFavoritoRepository } from '../../domain/ports/favorite.repository';
import { FAVORITO_REPOSITORY } from '../../domain/ports/favorite.repository';

@Injectable()
export class RemoveFavoritoUseCase {
  constructor(
    @Inject(FAVORITO_REPOSITORY)
    private readonly favoritoRepo: IFavoritoRepository,
  ) {}

  async execute(userId: string, propertyId: string): Promise<void> {
    const exists = await this.favoritoRepo.isFavorite(userId, propertyId);
    if (!exists) {
      throw new Error('El favorito no existe o ya fue eliminado.');
    }

    await this.favoritoRepo.removeFavorite(userId, propertyId);
  }
}
