import {
  IsString,
  IsOptional,
  IsNumber,
  IsPositive,
  Min,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateLocationDto } from './create-location.dto';

export class UpdatePropertyDto {
  @IsString()
  @IsOptional()
  titulo?: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  precio?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  area_m2?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  habitaciones?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  banos?: number;

  @IsString()
  @IsOptional()
  activo?: string;

  @IsString()
  @IsOptional()
  id_tipo_inmueble?: string;

  @IsOptional()
  @Type(() => CreateLocationDto)
  ubicacion?: CreateLocationDto;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  fotos?: string[];
}
