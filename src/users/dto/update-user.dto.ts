import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  readonly id: number;

  readonly firstName: string;

  readonly lastName: string;
}
