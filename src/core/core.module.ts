import { Module, forwardRef } from '@nestjs/common';
import { RegisterUseCase } from './application/use-cases/register.use-case';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { ValidateUserUseCase } from './application/use-cases/validate-user.use-case';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';

@Module({
  imports: [forwardRef(() => InfrastructureModule)],
  providers: [RegisterUseCase, LoginUseCase, ValidateUserUseCase],
  exports: [RegisterUseCase, LoginUseCase, ValidateUserUseCase],
})
export class CoreModule {}
