import { Body, Controller, Get, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Post()
  async create(@Body() bookDto: CreateBookDto) {
    return await this.booksService.createBook(bookDto);
  }

  @Get()
  async getAllBooks() {
    return await this.booksService.getAllBooks();
  }
}
