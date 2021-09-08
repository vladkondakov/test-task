import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 1, description: 'Unique user identifier' })
  @IsNotEmpty({ message: 'Must be filled.' })
  @IsNumber({}, { message: 'Must be number.' })
  readonly id: number;

  @ApiProperty({ example: 'Tom', description: 'User first name' })
  @IsOptional()
  @MinLength(2, {
    message: 'First name is too short. Minimal length is $constraint1 characters.',
  })
  @MaxLength(20, {
    message: 'First name is too long. Maximum length is $constraint1 characters.',
  })
  @IsString({ message: 'First name must be string.' })
  readonly firstName: string;

  @ApiProperty({ example: 'Kane', description: 'User last name' })
  @IsOptional()
  @MinLength(2, {
    message: 'First name is too short. Minimal length is $constraint1 characters.',
  })
  @MaxLength(20, {
    message: 'Last name is too long. Maximum length is $constraint1 characters.',
  })
  @IsString({ message: 'Must be string.' })
  readonly lastName: string;
}
