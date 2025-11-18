import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { IUserRepository } from 'src/core/domain/ports/user.repository';
import { USER_REPOSITORY } from 'src/core/domain/ports/user.repository';
import { User } from 'src/core/domain/entities/user.entity';

@Injectable()
export class GetUserByIdUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return user;
  }
}
