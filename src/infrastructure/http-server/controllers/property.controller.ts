import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CreatePropertyUseCase } from 'src/core/application/use-cases/create-property.use-case';
import { GetAllPropertiesUseCase } from 'src/core/application/use-cases/get-all-properties.use-case';
import { GetPropertyByIdUseCase } from 'src/core/application/use-cases/get-property-by-id.use-case';
import { UpdatePropertyUseCase } from 'src/core/application/use-cases/update-property.use-case';
import { DeletePropertyUseCase } from 'src/core/application/use-cases/delete-property.use-case';
import { Public } from '../decorators/public.decorator';
import { CurrentUser } from '../decorators/current-user.decorator';
import { CreatePropertyDto } from 'src/core/application/dto/create-property.dto';
import { UpdatePropertyDto } from 'src/core/application/dto/update-property.dto';

@Controller('properties')
export class PropertyController {
  constructor(
    private readonly createPropertyUseCase: CreatePropertyUseCase,
    private readonly getAllPropertiesUseCase: GetAllPropertiesUseCase,
    private readonly getPropertyByIdUseCase: GetPropertyByIdUseCase,
    private readonly updatePropertyUseCase: UpdatePropertyUseCase,
    private readonly deletePropertyUseCase: DeletePropertyUseCase,
  ) {}

  @Public()
  @Get()
  async findAll() {
    const properties = await this.getAllPropertiesUseCase.execute();
    return {
      message: 'Lista de inmuebles',
      data: properties,
    };
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const property = await this.getPropertyByIdUseCase.execute(id);
    return {
      message: 'Inmueble encontrado',
      data: property,
    };
  }

  @Post()
  async create(
    @Body() data: CreatePropertyDto,
    @CurrentUser('id') userId: string,
  ) {
    const property = await this.createPropertyUseCase.execute(data, userId);
    return {
      message: 'Inmueble creado exitosamente',
      data: property,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdatePropertyDto,
    @CurrentUser('id') userId: string,
  ) {
    const property = await this.updatePropertyUseCase.execute(id, data, userId);
    return {
      message: 'Inmueble actualizado exitosamente',
      data: property,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @CurrentUser('id') userId: string) {
    await this.deletePropertyUseCase.execute(id, userId);
    return {
      message: 'Inmueble eliminado exitosamente',
    };
  }
}
