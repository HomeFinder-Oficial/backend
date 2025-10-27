import { IsOptional, IsString, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterPropertyDto {
  @IsOptional()
  @IsString()
  ubicacion?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minPrecio?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxPrecio?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  habitaciones?: number;

  @IsOptional()
  @IsString()
  tipo?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number;
}
