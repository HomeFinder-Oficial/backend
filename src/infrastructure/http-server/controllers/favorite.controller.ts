import { Controller, Post, Delete, Get, Param, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AddFavoritoUseCase } from 'src/core/application/use-cases/add-favorite.use-case';
import { RemoveFavoritoUseCase } from 'src/core/application/use-cases/remove-favorite.use-case';
import { GetUserFavoritosUseCase } from 'src/core/application/use-cases/get-user-favorites.use-case';

@Controller('favorites')
@UseGuards(JwtAuthGuard)
export class FavoriteController {
  constructor(
    private readonly addFavoriteUseCase: AddFavoritoUseCase,
    private readonly removeFavoriteUseCase: RemoveFavoritoUseCase,
    private readonly getUserFavoritesUseCase: GetUserFavoritosUseCase,
  ) {}

  @Post(':propertyId')
  async addFavorite(@Param('propertyId') propertyId: string, @Req() req: any) {
    const userId = req.user.id;
    return this.addFavoriteUseCase.execute(userId, propertyId);
  }

  @Delete(':propertyId')
  async removeFavorite(@Param('propertyId') propertyId: string, @Req() req: any) {
    const userId = req.user.id;
    await this.removeFavoriteUseCase.execute(userId, propertyId);
    return { message: 'Favorito eliminado correctamente' };
  }

  @Get()
  async getFavorites(@Req() req: any) {
    const userId = req.user.id;
    return this.getUserFavoritesUseCase.execute(userId);
  }
}
