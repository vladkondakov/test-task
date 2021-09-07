import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty({ message: 'Must be filled.' })
  @IsNumber({}, { message: 'Must be string.' })
  readonly id: number;

  @IsString({ message: 'Must be string.' })
  readonly firstName: string;

  @IsString({ message: 'Must be string.' })
  readonly lastName: string;
}
