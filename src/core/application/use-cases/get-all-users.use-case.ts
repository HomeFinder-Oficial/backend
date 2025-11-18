import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '../../domain/ports/user.repository';
import type { IUserRepository } from '../../domain/ports/user.repository';

@Injectable()
export class GetAllUsersUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(page: number, limit: number) {
    const [users, total] = await Promise.all([
      this.userRepository.findAll(page, limit),
      this.userRepository.count(), // contar total de usuarios
    ]);

    return {
      data: users,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };
  }
}
