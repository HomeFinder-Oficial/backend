import { Inject, Injectable, ConflictException } from '@nestjs/common';
import { USER_REPOSITORY } from '../../domain/ports/user.repository';
import { PASSWORD_SERVICE } from '../../domain/ports/password.service';
import type { IUserRepository } from '../../domain/ports/user.repository';
import type { IPasswordService } from '../../domain/ports/password.service';
import { RegisterDto } from '../dto/register.dto';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(PASSWORD_SERVICE)
    private readonly passwordService: IPasswordService,
  ) { }

  private readonly DEFAULT_AVATAR =
    'https://e7.pngegg.com/pngimages/348/800/png-clipart-man-wearing-blue-shirt-illustration-computer-icons-avatar-user-login-avatar-blue-child-thumbnail.png';


  async execute(registerDto: RegisterDto): Promise<User> {
    // Verificar si el email ya existe
    const emailExists = await this.userRepository.existsByEmail(
      registerDto.email,
    );
    if (emailExists) {
      throw new ConflictException('El email ya está registrado');
    }

    // Hash de la contraseña
    const hashedPassword = await this.passwordService.hash(
      registerDto.contrasena,
    );

    // Crear usuario
    const newUser = await this.userRepository.create({
      ...registerDto,
      contrasena: hashedPassword,
      activo: true,
      foto: this.DEFAULT_AVATAR,
    });

    return newUser;
  }
}
