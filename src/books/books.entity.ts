import { User } from 'src/users/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BeforeInsert,
  JoinColumn,
  BeforeUpdate,
} from 'typeorm';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 100, name: 'Name', unique: true, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 30, name: '' })
  author: string;

  @Column({ name: 'user_id', default: null })
  userId: number;

  @ManyToOne(() => User, (user) => user.books)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @BeforeInsert()
  private nameToLowerCase() {
    this.name = this.name.toLowerCase();
    this.author = this.author.toLowerCase();
  }
}
