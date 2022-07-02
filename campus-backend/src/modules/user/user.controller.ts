import { Role } from './../../constatns/role.enum';
import { UpdateResult } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiCreatedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { JwtGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  @ApiCreatedResponse({ description: 'Created' })
  @ApiConflictResponse({ description: 'Email Already Exist' })
  @ApiBadRequestResponse({ description: 'Invalid Password' })
  createUser(@Body() createUserDto: CreateUserDto): Promise<CreateUserDto> {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({ description: 'Users Array' })
  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userService.getAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'User' })
  @ApiNotFoundResponse({ description: 'User Not Found' })
  async getSingleUser(@Param('id') userId: string): Promise<UserEntity> {
    return await this.userService.getById(userId);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Affected' })
  @ApiNotFoundResponse({ description: 'User Not Found' })
  async updateUser(
    @Param('id') userId: string,
    @Body() user: UpdateUserDto,
  ): Promise<UpdateResult> {
    return await this.userService.update(userId, user);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  @ApiOkResponse({ description: 'Deleted' })
  @ApiNotFoundResponse({ description: 'User Not Found' })
  deleteUser(@Param('id') userId: string): Promise<void> {
    return this.userService.delete(userId);
  }
}
