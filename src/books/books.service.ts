import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './books.entity';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(@InjectRepository(Book) private bookRepository: Repository<Book>) {}

  async createBook(dto: CreateBookDto): Promise<Book> {
    const name: string = dto.name.toLowerCase();
    const author: string = dto.author.toLowerCase();

    const candidate = await this.bookRepository.findOne({ where: { name, author } });
    if (candidate) {
      throw new HttpException(
        'The book with provided name and author is already exists.',
        HttpStatus.BAD_REQUEST
      );
    }

    const book = this.bookRepository.create(dto);
    await this.bookRepository.save(book);
    return book;
  }

  async getAllBooks(): Promise<Book[]> {
    const books = await this.bookRepository.find();
    return books;
  }
}
