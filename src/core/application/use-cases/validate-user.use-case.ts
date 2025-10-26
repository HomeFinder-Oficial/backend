import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '../../domain/ports/user.repository';
import type { IUserRepository } from '../../domain/ports/user.repository';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class ValidateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(userId: string): Promise<User | null> {
    const user = await this.userRepository.findById(userId);
    if (!user || !user.isActive()) {
      return null;
    }
    return user;
  }
}
