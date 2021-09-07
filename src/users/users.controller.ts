import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() userDto: CreateUserDto) {
    return await this.usersService.createUser(userDto);
  }

  @Get()
  async getAll() {
    return await this.usersService.getAllUsers();
  }

  @Put()
  async update(@Body() userDto: UpdateUserDto) {
    return await this.usersService.updateUser(userDto);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return await this.usersService.delete(id);
  }

  @Get('/:id')
  async getUserFullInfo(@Param('id') id: number) {
    return await this.usersService.getUserFullInfo(id);
  }

  @Put('/subscription/:id')
  async purchaseSubscription(@Param('id') id: number) {
    return await this.usersService.purchaseSubscription(id);
  }
}
