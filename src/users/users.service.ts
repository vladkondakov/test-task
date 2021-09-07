import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);
    return user;
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    const candidate = await this.getUserByEmail(dto.email);
    if (candidate) {
      throw new HttpException(
        'The user with provided email already exists.',
        HttpStatus.BAD_REQUEST
      );
    }

    const user = this.userRepository.create(dto);
    user.books = [];
    await this.userRepository.save(user);
    return user;
  }

  async updateUser(dto: UpdateUserDto): Promise<User> {
    const user = await this.getUserById(dto.id);
    if (!user) {
      throw new HttpException("The user doesn't exist.", HttpStatus.BAD_REQUEST);
    }

    const toUpdate = Object.assign(user, dto);
    const updatedUser = await this.userRepository.save(toUpdate);
    return updatedUser;
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async getUserFullInfo(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id, { relations: ['books'] });
    return user;
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }

  async purchaseSubscription(id: number): Promise<User> {
    const user = await this.getUserById(id);
    if (!user) {
      throw new HttpException("The user doesn't exist.", HttpStatus.BAD_REQUEST);
    }

    user.hasSubscription = true;
    const updatedUser = await this.userRepository.save(user);
    return updatedUser;
  }
}
