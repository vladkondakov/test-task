import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from '../pipes/validation.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteResultDto } from './dto/delete-result.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';

@ApiTags('Users routes')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  async getAll() {
    return await this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, type: User })
  @Post()
  async create(@Body(ValidationPipe) userDto: CreateUserDto) {
    return await this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, type: [User] })
  @Put()
  async update(@Body(ValidationPipe) userDto: UpdateUserDto) {
    return await this.usersService.updateUser(userDto);
  }

  @ApiOperation({ summary: 'Get user with his books' })
  @ApiResponse({ status: 200, type: User })
  @Get('/:id')
  async getUserFullInfo(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.getUserFullInfo(id);
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200, type: DeleteResultDto })
  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.delete(id);
  }

  @ApiOperation({ summary: 'Purchase Subscription' })
  @ApiResponse({ status: 200, type: User })
  @Put('/subscription/:id')
  async purchaseSubscription(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.purchaseSubscription(id);
  }
}
