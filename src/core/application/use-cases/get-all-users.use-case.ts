import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '../../domain/ports/user.repository';
import type { IUserRepository } from '../../domain/ports/user.repository';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class GetAllUsersUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(): Promise<User[]> {
    return await this.userRepository.findAll();
  }
}
