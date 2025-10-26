import { Controller, Post, Body, Get } from '@nestjs/common';
import { RegisterDto } from '../../../core/application/dto/register.dto';
import { LoginDto } from '../../../core/application/dto/login.dto';
import { RegisterUseCase } from '../../../core/application/use-cases/register.use-case';
import { LoginUseCase } from '../../../core/application/use-cases/login.use-case';
import { Public } from '../decorators/public.decorator';
import { CurrentUser } from '../decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) {}

  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.registerUseCase.execute(registerDto);
    return {
      message: 'Usuario registrado exitosamente',
      user: user.toSafeObject(),
    };
  }

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.loginUseCase.execute(loginDto);
  }

  @Get('profile')
  getProfile(@CurrentUser() user: any) {
    return {
      message: 'Perfil del usuario autenticado',
      user,
    };
  }
}
