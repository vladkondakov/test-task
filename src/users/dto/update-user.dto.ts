import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  readonly id: number;

  readonly firstName: string;

  readonly lastName: string;
}
