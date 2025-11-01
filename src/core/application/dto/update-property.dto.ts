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
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  price?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  area_m2?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  bedrooms?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  bathrooms?: number;

  @IsString()
  @IsOptional()
  active?: string;

  @IsString()
  @IsOptional()
  property_type_id?: string;

  @IsOptional()
  @Type(() => CreateLocationDto)
  location?: CreateLocationDto;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];
}
