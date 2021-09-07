import { IsNotEmpty, IsNumber } from 'class-validator';

export class BookActionDto {
  @IsNotEmpty({ message: 'Must be filled.' })
  @IsNumber({}, { message: 'Must be number.' })
  readonly userId: number;

  @IsNotEmpty({ message: 'Must be filled.' })
  @IsNumber({}, { message: 'Must be number.' })
  readonly bookId: number;
}
