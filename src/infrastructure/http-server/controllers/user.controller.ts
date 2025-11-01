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
import { Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Controller('users')
@UseGuards(JwtAuthGuard)
// @UseGuards(JwtAuthGuard, RolesGuard) // Uncomment if you want role-based protection
export class UserController {
  constructor(
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) { }

  @Get()
  async getAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    this.logger.info('Fetching all users', { page: pageNumber, limit: limitNumber });

    const result = await this.getAllUsersUseCase.execute(pageNumber, limitNumber);

    this.logger.info('Users retrieved successfully', { count: result.data.length });

    return result;
  }

  @Put(':id')
  @Roles('admin')
  async update(@Param('id') id: string, @Body() data: any) {
    this.logger.info('Updating user', { userId: id });
    const updatedUser = await this.updateUserUseCase.execute(id, data);
    this.logger.info('User updated successfully', { userId: id });
    return updatedUser;
  }

  @Delete(':id')
  @Roles('admin')
  async delete(@Param('id') id: string) {
    this.logger.warn('Deleting user', { userId: id });
    await this.deleteUserUseCase.execute(id);
    this.logger.info('User deleted successfully', { userId: id });
    return { message: 'User deleted successfully' };
  }
}
