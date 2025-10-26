import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Query,
} from '@nestjs/common';
import { GetAllUsersUseCase } from '../../../core/application/use-cases/get-all-users.use-case';
import { UpdateUserUseCase } from '../../../core/application/use-cases/update-user.use-case';
import { DeleteUserUseCase } from '../../../core/application/use-cases/delete-user.use-case';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { Logger } from '@nestjs/common';


@Controller('users')
//@UseGuards(JwtAuthGuard, RolesGuard)
@UseGuards(JwtAuthGuard)
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) { }

  @Get()
  async getAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    this.logger.log(`Obteniendo todos los usuarios - página: ${pageNumber}, límite: ${limitNumber}`);
    const result = await this.getAllUsersUseCase.execute(pageNumber, limitNumber);
    this.logger.log(`Usuarios obtenidos: ${result.data.length}`);
    return result;
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
