import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty({ message: 'Must be filled.' })
  @IsNumber({}, { message: 'Must be number.' })
  readonly id: number;

  @IsOptional()
  @MinLength(2, {
    message: 'First name is too short. Minimal length is $constraint1 characters.',
  })
  @MaxLength(20, {
    message: 'First name is too long. Maximum length is $constraint1 characters.',
  })
  @IsString({ message: 'First name must be string.' })
  readonly firstName: string;

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
