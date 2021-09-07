import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Must be email.' })
  readonly email: string;

  @MinLength(2, {
    message: 'First name is too short. Minimal length is $constraint1 characters.',
  })
  @MaxLength(20, {
    message: 'First name is too long. Maximum length is $constraint1 characters.',
  })
  @IsString({ message: 'First name must be string.' })
  readonly firstName: string;

  @MinLength(2, {
    message: 'First name is too short. Minimal length is $constraint1 characters.',
  })
  @MaxLength(20, {
    message: 'Last name is too long. Maximum length is $constraint1 characters.',
  })
  @IsString({ message: 'Must be string.' })
  readonly lastName: string;
}
