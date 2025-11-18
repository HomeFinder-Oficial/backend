import { Controller, Get } from '@nestjs/common';
import { Public } from '../decorators/public.decorator';
import { GetAllPropertyTypesUseCase } from 'src/core/application/use-cases/get-all-property-types.use-case';

@Controller('property-types')
export class PropertyTypeController {
  constructor(
    private readonly getAllPropertyTypesUseCase: GetAllPropertyTypesUseCase,
  ) {}

  @Public()
  @Get()
  async findAll() {
    const types = await this.getAllPropertyTypesUseCase.execute();
    return {
      message: 'Lista de tipos de inmuebles',
      data: types,
    };
  }
}
