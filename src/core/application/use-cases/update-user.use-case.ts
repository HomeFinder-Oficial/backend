import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { USER_REPOSITORY } from '../../domain/ports/user.repository';
import type { IUserRepository } from '../../domain/ports/user.repository';
import { User } from '../../domain/entities/user.entity';
import { PASSWORD_SERVICE } from 'src/core/domain/ports/password.service';
import type { IPasswordService } from 'src/core/domain/ports/password.service';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,

    @Inject(PASSWORD_SERVICE)
    private readonly passwordService: IPasswordService,
  ) {}

  async execute(id: string, data: Partial<User>): Promise<User> {
    const existing = await this.userRepository.findById(id);
    if (!existing) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (data.password) {
      data.password = await this.passwordService.hash(data.password);
    }

    const updated = await this.userRepository.update(id, data);
    return updated;
  }
}
