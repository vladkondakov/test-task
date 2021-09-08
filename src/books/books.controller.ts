import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UsePipes } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { BookActionDto } from './dto/book-action.dto';
import { ValidationPipe } from '../pipes/validation.pipe';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Book } from './books.entity';
import { SwaggerDescriptions } from 'src/utils/descriptions/swagger-descriptions';

@ApiTags('Books routes')
@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @ApiOperation({ summary: 'Get all books' })
  @ApiResponse({ status: 200, type: [Book] })
  @Get()
  async getAllBooks() {
    return await this.booksService.getAllBooks();
  }

  @ApiOperation({
    summary: 'Create a new book',
    description: new SwaggerDescriptions().createBookD(),
  })
  @ApiResponse({ status: 201, type: Book })
  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() bookDto: CreateBookDto) {
    return await this.booksService.createBook(bookDto);
  }

  @ApiOperation({
    summary: 'Get information about book',
    description: new SwaggerDescriptions().getBookD(),
  })
  @ApiResponse({ status: 201, type: Book })
  @Get('/:id')
  async getBook(@Param('id', ParseIntPipe) id: number) {
    return await this.booksService.getBookById(id);
  }

  @ApiOperation({
    summary: 'Give book to user',
    description: new SwaggerDescriptions().giveBookToUserD(),
  })
  @ApiResponse({ status: 201, type: Book })
  @UsePipes(ValidationPipe)
  @Post('/give')
  async giveBookToUser(@Body() bookDto: BookActionDto) {
    return await this.booksService.giveBookToUser(bookDto);
  }

  @ApiOperation({
    summary: 'Take back the book',
    description: new SwaggerDescriptions().takeBookBackD(),
  })
  @ApiResponse({ status: 201, type: Book })
  @UsePipes(ValidationPipe)
  @Put('/give')
  async takeBookBack(@Body() bookDto: BookActionDto) {
    return await this.booksService.takeBookBack(bookDto);
  }
}
