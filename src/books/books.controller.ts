import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { BookActionDto } from './dto/book-action';

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

  @Get('/:id')
  async getBook(@Param('id') id: number) {
    return await this.booksService.getBookById(id);
  }

  @Post('/give')
  async giveBookToUser(@Body() bookDto: BookActionDto) {
    return await this.booksService.giveBookToUser(bookDto);
  }

  @Put('/give')
  async takeBookBack(@Body() bookDto: BookActionDto) {
    return await this.booksService.takeBookBack(bookDto);
  }
}
