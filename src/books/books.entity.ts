import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ example: 1, description: 'Unique book identifier' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ example: 'Three Comrades', description: 'Book name' })
  @Column({ type: 'varchar', length: 100, name: 'Name', unique: true, nullable: false })
  name: string;

  @ApiProperty({ example: 'Erich Maria Remarque', description: 'Book author' })
  @Column({ type: 'varchar', length: 30, name: '' })
  author: string;

  @ApiProperty({ example: 2, description: 'User Id' })
  @Column({ name: 'user_id', default: null })
  userId: number;

  // @ApiProperty({ type: () => 2, description: 'Unique user identifier' })
  @ManyToOne(() => User, (user) => user.books)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @BeforeInsert()
  private nameToLowerCase() {
    this.name = this.name.toLowerCase();
    this.author = this.author.toLowerCase();
  }
}
