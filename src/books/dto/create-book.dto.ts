import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty({ message: 'Must be filled.' })
  @IsString({ message: 'Must be string.' })
  readonly name: string;

  @IsString({ message: 'Must be string.' })
  readonly author: string;
}
