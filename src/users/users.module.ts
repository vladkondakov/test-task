import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { BooksModule } from 'src/books/books.module';
import { Book } from 'src/books/books.entity';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([User, Book]), forwardRef(() => BooksModule)],
  exports: [UsersService],
})
export class UsersModule {}
