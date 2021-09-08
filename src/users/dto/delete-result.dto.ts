import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class DeleteResultDto {
  @ApiProperty({ example: 5, description: 'Unique user identifier' })
  @IsNotEmpty({ message: 'Must be filled.' })
  @IsNumber({}, { message: 'Must be number.' })
  readonly id: number;

  @ApiProperty({ example: 1, description: 'Number of lines deleted' })
  @IsNumber({}, { message: 'Must be number.' })
  readonly affected: number;
}
