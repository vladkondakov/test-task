import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SwaggerDescriptions } from 'src/utils/descriptions/swagger-descriptions';
import { ValidationPipe } from '../pipes/validation.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteResultDto } from './dto/delete-result.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';

@ApiTags('Users routes')
@Controller('users')
export class UsersController {
  private logger = new Logger('UsersController');

  constructor(private usersService: UsersService) {}

  log(title: string, method: string, data: object = { params: {}, result: {} }) {
    this.logger.log({ title, method, data });
  }

  @ApiOperation({ summary: 'Get all users', description: new SwaggerDescriptions().getAllD() })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  async getAll() {
    this.log('Get all users.', 'getAll');
    const users = await this.usersService.getAllUsers();
    this.log('Existing users.', 'getAll', { result: users });
    return users;
  }

  @ApiOperation({ summary: 'Create a new user', description: new SwaggerDescriptions().createD() })
  @ApiResponse({ status: 201, type: User })
  @Post()
  async create(@Body(ValidationPipe) userDto: CreateUserDto) {
    this.log('Create new user.', 'create', { params: userDto });
    const user = await this.usersService.createUser(userDto);
    this.log('User was found.', 'create', { params: userDto, result: user });
    return user;
  }

  @ApiOperation({ summary: 'Update user', description: new SwaggerDescriptions().updateD() })
  @ApiResponse({ status: 200, type: [User] })
  @Put()
  async update(@Body(ValidationPipe) userDto: UpdateUserDto) {
    return await this.usersService.updateUser(userDto);
  }

  @ApiOperation({
    summary: 'Get user with his books',
    description: new SwaggerDescriptions().getUserFullInfoD(),
  })
  @ApiResponse({ status: 200, type: User })
  @Get('/:id')
  async getUserFullInfo(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.getUserFullInfo(id);
  }

  @ApiOperation({ summary: 'Delete user', description: new SwaggerDescriptions().deleteD() })
  @ApiResponse({ status: 200, type: DeleteResultDto })
  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.delete(id);
  }

  @ApiOperation({
    summary: 'Purchase Subscription',
    description: new SwaggerDescriptions().purchaseSubscriptionD(),
  })
  @ApiResponse({ status: 200, type: User })
  @Put('/subscription/:id')
  async purchaseSubscription(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.purchaseSubscription(id);
  }
}
