import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { USER_REPOSITORY } from '../../domain/ports/user.repository';
import { PASSWORD_SERVICE } from '../../domain/ports/password.service';
import { TOKEN_SERVICE } from '../../domain/ports/token.service';
import type { IUserRepository } from '../../domain/ports/user.repository';
import type { IPasswordService } from '../../domain/ports/password.service';
import type { ITokenService } from '../../domain/ports/token.service';
import { LoginDto } from '../dto/login.dto';
import { AuthResponseDto } from '../dto/auth-response.dto';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(PASSWORD_SERVICE)
    private readonly passwordService: IPasswordService,
    @Inject(TOKEN_SERVICE)
    private readonly tokenService: ITokenService,
  ) {}

  async execute(loginDto: LoginDto): Promise<AuthResponseDto> {
    // Buscar usuario por email
    const user = await this.userRepository.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Verificar si está activo
    if (!user.isActive()) {
      throw new UnauthorizedException('Usuario inactivo');
    }

    // Verificar contraseña
    const isPasswordValid = await this.passwordService.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Generar token
    const payload = {
      sub: user.id,
      email: user.email,
      role_id: user.role_id,
    };
    const access_token = await this.tokenService.generateToken(payload);

    return {
      access_token,
      user: user.toSafeObject(),
    };
  }
}
