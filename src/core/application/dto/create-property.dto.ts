import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsPositive,
  Min,
  IsArray,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateLocationDto } from './create-location.dto';

export class CreatePropertyDto {
  @IsString()
  @IsNotEmpty()
  title: string;

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
  @IsNotEmpty()
  property_type_id: string;

  @IsEnum(['sold', 'rented', null], {
    message: 'type_of_sale debe ser "sold", "rented" o null',
  })
  @IsOptional()
  type_of_sale?: 'sold' | 'rented' | null;

  @ValidateNested()
  @Type(() => CreateLocationDto)
  @IsOptional()
  location?: CreateLocationDto;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];
}
