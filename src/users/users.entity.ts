import { ApiProperty } from '@nestjs/swagger';
import { Book } from '../books/books.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty({ example: 1, description: 'Unique user identifier' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ example: 'user@gmail.com', description: 'User email' })
  @Column({ default: '', type: 'varchar', name: 'Email', unique: true, nullable: false })
  email: string;

  @ApiProperty({ example: 'Tom', description: 'User first name' })
  @Column({ type: 'varchar', length: 20, name: 'First Name' })
  firstName: string;

  @ApiProperty({ example: 'Kane', description: 'User last name' })
  @Column({ type: 'varchar', length: 20, name: 'Last Name' })
  lastName: string;

  @ApiProperty({ example: 'true', description: 'Does user have subscription? (true/false)' })
  @Column({ default: false, name: 'Subscription' })
  hasSubscription: boolean;

  @ApiProperty({
    type: () => [Book],
    description: 'Does user have subscription? (true/false)',
  })
  @OneToMany(() => Book, (book) => book.user)
  books: Book[];
}
