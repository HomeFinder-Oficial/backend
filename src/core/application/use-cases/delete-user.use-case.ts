import {
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { USER_REPOSITORY } from '../../domain/ports/user.repository';
import type { IUserRepository } from '../../domain/ports/user.repository';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const existing = await this.userRepository.findById(id);

    if (!existing) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (!existing.isActive()) {
      throw new BadRequestException('El usuario ya está inactivo');
    }

    await this.userRepository.delete(id);
  }
}
