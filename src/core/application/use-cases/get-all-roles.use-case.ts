import { Inject, Injectable } from '@nestjs/common';
import type { IRoleRepository } from 'src/core/domain/ports/role.repository';
import { ROLE_REPOSITORY } from 'src/core/domain/ports/role.repository';
import { Role } from 'src/core/domain/entities/role.entity';

@Injectable()
export class GetAllRolesUseCase {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: IRoleRepository,
  ) {}

  async execute(): Promise<Role[]> {
    return this.roleRepository.findAll();
  }
}
