import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ValidationPipe } from '../pipes/validation.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body(ValidationPipe) userDto: CreateUserDto) {
    return await this.usersService.createUser(userDto);
  }

  @Get()
  async getAll() {
    return await this.usersService.getAllUsers();
  }

  @Put()
  async update(@Body(ValidationPipe) userDto: UpdateUserDto) {
    return await this.usersService.updateUser(userDto);
  }

  @Get('/:id')
  async getUserFullInfo(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.getUserFullInfo(id);
  }

  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.delete(id);
  }

  @Put('/subscription/:id')
  async purchaseSubscription(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.purchaseSubscription(id);
  }
}
