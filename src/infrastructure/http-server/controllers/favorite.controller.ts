import { Controller, Post, Delete, Get, Param, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AddFavoriteUseCase } from 'src/core/application/use-cases/add-favorite.use-case';
import { RemoveFavoriteUseCase } from 'src/core/application/use-cases/remove-favorite.use-case';
import { GetUserFavoritesUseCase } from 'src/core/application/use-cases/get-user-favorites.use-case';

@Controller('favorites')
@UseGuards(JwtAuthGuard)
export class FavoriteController {
  constructor(
    private readonly addFavoriteUseCase: AddFavoriteUseCase,
    private readonly removeFavoriteUseCase: RemoveFavoriteUseCase,
    private readonly getUserFavoritesUseCase: GetUserFavoritesUseCase,
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
