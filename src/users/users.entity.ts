import { Book } from 'src/books/books.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ default: '', type: 'varchar', name: 'Email', unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 20, name: 'First Name' })
  firstName: string;

  @Column({ type: 'varchar', length: 20, name: 'Last Name' })
  lastName: string;

  @Column({ default: false, name: 'Subscription' })
  hasSubscription: boolean;

  @OneToMany(() => Book, (book) => book.user)
  books: Book[];
}
