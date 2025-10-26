import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { GetAllUsersUseCase } from '../../../core/application/use-cases/get-all-users.use-case';
import { UpdateUserUseCase } from '../../../core/application/use-cases/update-user.use-case';
import { DeleteUserUseCase } from '../../../core/application/use-cases/delete-user.use-case';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';

@Controller('users')
//@UseGuards(JwtAuthGuard, RolesGuard)
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Get()
  @Roles('admin')
  async getAll() {
    return await this.getAllUsersUseCase.execute();
  }

  @Put(':id')
  @Roles('admin')
  async update(@Param('id') id: string, @Body() data: any) {
    return await this.updateUserUseCase.execute(id, data);
  }

  @Delete(':id')
  @Roles('admin')
  async delete(@Param('id') id: string) {
    await this.deleteUserUseCase.execute(id);
    return { message: 'Usuario eliminado correctamente' };
  }
}
