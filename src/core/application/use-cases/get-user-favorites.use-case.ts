import { Inject, Injectable } from '@nestjs/common';
import type { IFavoritoRepository } from '../../domain/ports/favorite.repository';
import { FAVORITO_REPOSITORY } from '../../domain/ports/favorite.repository';
import type { Favorito } from 'src/core/domain/entities/favorito.entity';

@Injectable()
export class GetUserFavoritosUseCase {
  constructor(
    @Inject(FAVORITO_REPOSITORY)
    private readonly favoritoRepo: IFavoritoRepository,
  ) {}

  async execute(userId: string): Promise<Favorito[]> {
    return this.favoritoRepo.getFavoritesByUser(userId);
  }
}
