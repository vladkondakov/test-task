import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { Book } from './books.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { User } from 'src/users/users.entity';
import { BookActionDto } from './dto/book-action.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private usersService: UsersService
  ) {}

  async createBook(dto: CreateBookDto): Promise<Book> {
    const name: string = dto.name.toLowerCase();
    const author: string = dto.author.toLowerCase();

    const candidate = await this.bookRepository.findOne({ where: { name, author } });
    if (candidate) {
      throw new HttpException(
        {
          message: 'The book with provided name and author is already exists.',
          payload: candidate,
        },
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

  async getBooksByUserId(id: number): Promise<Book[]> {
    const books = await this.bookRepository.find({ where: { userId: id } });
    return books;
  }

  async getBookById(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne(id);
    return book;
  }

  async giveBookToUser(dto: BookActionDto): Promise<Book> {
    const { userId, bookId } = dto;
    const user = await this.usersService.getUserFullInfo(userId);

    if (!user) {
      throw new HttpException(
        {
          message: `The user doesn't exist`,
          payload: { userId },
        },
        HttpStatus.FORBIDDEN
      );
    }

    if (!user?.hasSubscription) {
      throw new HttpException(
        {
          message: `The user must purchase a subscription.`,
          payload: user,
        },
        HttpStatus.FORBIDDEN
      );
    }

    const book = await this.getBookById(bookId);

    if (!!book.userId) {
      throw new HttpException(
        {
          message: `Book has been taken.`,
          payload: book,
        },
        HttpStatus.FORBIDDEN
      );
    }

    if (user.books.length >= 5) {
      throw new HttpException(
        {
          message: 'The user book limit exceeded.',
          payload: user.books,
        },
        HttpStatus.BAD_REQUEST
      );
    }

    user.books = [...user.books, book];
    await this.userRepository.save(user);
    book.userId = userId;

    return book;
  }

  async takeBookBack(dto: BookActionDto): Promise<Book> {
    const { userId, bookId } = dto;
    const book = await this.getBookById(bookId);

    if (!book) {
      throw new HttpException(
        {
          message: "The book doesn't exist.",
          payload: { bookId },
        },
        HttpStatus.BAD_REQUEST
      );
    }
    if (book.userId !== userId) {
      throw new HttpException(
        {
          message: 'Provided user is not the owner.',
          payload: book,
        },
        HttpStatus.BAD_REQUEST
      );
    }

    book.userId = null;
    await this.bookRepository.save(book);

    return book;
  }
}
