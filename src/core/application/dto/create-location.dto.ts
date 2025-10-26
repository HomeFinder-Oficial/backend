import { IsString, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateLocationDto {
  @IsString()
  @IsOptional()
  direccion?: string;

  @IsString()
  @IsOptional()
  ciudad?: string;

  @IsString()
  @IsOptional()
  barrio?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  latitud?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  longitud?: number;
}
