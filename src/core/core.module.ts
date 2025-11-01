import { Module, forwardRef } from '@nestjs/common';
import { RegisterUseCase } from './application/use-cases/register.use-case';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { ValidateUserUseCase } from './application/use-cases/validate-user.use-case';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { GetAllUsersUseCase } from './application/use-cases/get-all-users.use-case';
import { UpdateUserUseCase } from './application/use-cases/update-user.use-case';
import { DeleteUserUseCase } from './application/use-cases/delete-user.use-case';
import { CreatePropertyUseCase } from './application/use-cases/create-property.use-case';
import { GetAllPropertiesUseCase } from './application/use-cases/get-all-properties.use-case';
import { GetPropertyByIdUseCase } from './application/use-cases/get-property-by-id.use-case';
import { UpdatePropertyUseCase } from './application/use-cases/update-property.use-case';
import { DeletePropertyUseCase } from './application/use-cases/delete-property.use-case';
import { SearchPropertiesUseCase } from './application/use-cases/search-properties.use-case';
import { AddFavoriteUseCase } from './application/use-cases/add-favorite.use-case';
import { GetUserFavoritesUseCase } from './application/use-cases/get-user-favorites.use-case';
import { RemoveFavoriteUseCase } from './application/use-cases/remove-favorite.use-case';

@Module({
  imports: [forwardRef(() => InfrastructureModule)],
  providers: [
    // Auth
    RegisterUseCase,
    LoginUseCase,
    ValidateUserUseCase,
    // Users
    GetAllUsersUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    // Properties
    CreatePropertyUseCase,
    GetAllPropertiesUseCase,
    GetPropertyByIdUseCase,
    UpdatePropertyUseCase,
    DeletePropertyUseCase,
    SearchPropertiesUseCase,
    AddFavoriteUseCase,
    GetUserFavoritesUseCase,
    RemoveFavoriteUseCase,
  ],
  exports: [
    // Auth
    RegisterUseCase,
    LoginUseCase,
    ValidateUserUseCase,
    // Users
    GetAllUsersUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    // Properties
    CreatePropertyUseCase,
    GetAllPropertiesUseCase,
    GetPropertyByIdUseCase,
    UpdatePropertyUseCase,
    DeletePropertyUseCase,
    SearchPropertiesUseCase,
    AddFavoriteUseCase,
    GetUserFavoritesUseCase,
    RemoveFavoriteUseCase
  ],
})
export class CoreModule {}
