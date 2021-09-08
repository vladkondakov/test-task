import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ example: 'Three Comrades', description: 'Book name' })
  @IsNotEmpty({ message: 'Must be filled.' })
  @IsString({ message: 'Must be string.' })
  readonly name: string;

  @ApiProperty({ example: 'Erich Maria Remarque', description: 'Book author' })
  @IsOptional()
  @IsString({ message: 'Must be string.' })
  readonly author: string;
}
