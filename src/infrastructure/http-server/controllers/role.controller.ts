import { Controller, Get } from '@nestjs/common';
import { Public } from '../decorators/public.decorator';
import { GetAllRolesUseCase } from 'src/core/application/use-cases/get-all-roles.use-case';

@Controller('roles')
export class RoleController {
  constructor(private readonly getAllRolesUseCase: GetAllRolesUseCase) {}

  @Public()
  @Get()
  async findAll() {
    const roles = await this.getAllRolesUseCase.execute();
    return {
      message: 'Lista de roles',
      data: roles,
    };
  }
}
