import { User } from 'src/users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BeforeInsert } from 'typeorm';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 100, name: 'Name', unique: true, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 30, name: '' })
  author: string;

  @ManyToOne(() => User, (user) => user.books)
  user: User;

  @BeforeInsert()
  nameToLowerCase() {
    this.name = this.name.toLowerCase();
    this.author = this.author.toLowerCase();
  }
}
