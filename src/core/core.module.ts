import { Module, forwardRef } from '@nestjs/common';
import { RegisterUseCase } from './application/use-cases/register.use-case';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { ValidateUserUseCase } from './application/use-cases/validate-user.use-case';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { GetAllUsersUseCase } from './application/use-cases/get-all-users.use-case';
import { UpdateUserUseCase } from './application/use-cases/update-user.use-case';
import { DeleteUserUseCase } from './application/use-cases/delete-user.use-case';

@Module({
  imports: [forwardRef(() => InfrastructureModule)],
  providers: [RegisterUseCase, LoginUseCase, ValidateUserUseCase, GetAllUsersUseCase, UpdateUserUseCase, DeleteUserUseCase],
  exports: [RegisterUseCase, LoginUseCase, ValidateUserUseCase, GetAllUsersUseCase, UpdateUserUseCase, DeleteUserUseCase],
})
export class CoreModule {}
