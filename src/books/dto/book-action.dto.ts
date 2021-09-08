import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class BookActionDto {
  @ApiProperty({ example: 1, description: 'Unique user identifier' })
  @IsNotEmpty({ message: 'Must be filled.' })
  @IsNumber({}, { message: 'Must be number.' })
  readonly userId: number;

  @ApiProperty({ example: 2, description: 'Unique book identifier' })
  @IsNotEmpty({ message: 'Must be filled.' })
  @IsNumber({}, { message: 'Must be number.' })
  readonly bookId: number;
}
