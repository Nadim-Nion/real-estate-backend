import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreatePropertyDto {
  @ApiProperty({
    example: 'Cozy Apartment',
    description: 'The title of the property',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Cozy Apartment', description: 'cozy-apartment' })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({
    example: 'A cozy apartment located in the city center.',
    description: 'A brief description of the property',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 'Downtown',
    description: 'The location of the property',
  })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({
    example: 250000,
    description: 'The price of the property',
  })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({
    example: 3,
    description: 'Number of bedrooms in the property',
  })
  @IsNumber()
  @IsPositive()
  bedrooms: number;

  @ApiProperty({
    example: 2,
    description: 'Number of bathrooms in the property',
  })
  @IsNumber()
  @IsPositive()
  bathrooms: number;

  @ApiProperty({
    example: 'Pool, Gym, Parking',
    description: 'Amenities available at the property',
  })
  @IsString()
  @IsOptional()
  aminities?: string;

  @ApiProperty({
    example: true,
    description: 'Status of the property (available or not)',
  })
  @IsBoolean()
  @IsOptional()
  status?: boolean;

  @ApiProperty({
    example: '1',
    description: 'ID of the category the property belongs to',
  })
  @IsString()
  @IsNotEmpty()
  category_id: string;
}
