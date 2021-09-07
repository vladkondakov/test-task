import { IsNotEmpty } from 'class-validator';

export class BookActionDto {
  @IsNotEmpty()
  readonly userId: number;

  @IsNotEmpty()
  readonly bookId: number;
}
