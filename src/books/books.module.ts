import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './books.entity';
import { UsersModule } from '../users/users.module';
import { User } from '../users/users.entity';

@Module({
  providers: [BooksService],
  controllers: [BooksController],
  imports: [TypeOrmModule.forFeature([Book, User]), UsersModule],
})
export class BooksModule {}
