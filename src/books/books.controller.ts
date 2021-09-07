import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UsePipes } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { BookActionDto } from './dto/book-action';
import { ValidationPipe } from '../pipes/validation.pipe';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() bookDto: CreateBookDto) {
    return await this.booksService.createBook(bookDto);
  }

  @Get()
  async getAllBooks() {
    return await this.booksService.getAllBooks();
  }

  @Get('/:id')
  async getBook(@Param('id', ParseIntPipe) id: number) {
    return await this.booksService.getBookById(id);
  }

  @UsePipes(ValidationPipe)
  @Post('give')
  async giveBookToUser(@Body() bookDto: BookActionDto) {
    return await this.booksService.giveBookToUser(bookDto);
  }

  @UsePipes(ValidationPipe)
  @Put('/give')
  async takeBookBack(@Body() bookDto: BookActionDto) {
    return await this.booksService.takeBookBack(bookDto);
  }
}
