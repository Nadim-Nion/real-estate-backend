import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Residential',
    description: 'The name of the category',
  })
  @IsString()
  @IsNotEmpty()
  name: string;


  @ApiProperty({
    example: 'residential',
    description: 'The slug of the category',
  })
  @IsString()
  @IsNotEmpty()
  slug: string;
}
