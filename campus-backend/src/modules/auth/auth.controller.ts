import { Body, Controller, Post } from '@nestjs/common';
import { UserLoginDto } from './dto/user-login.dto';
import { AuthService } from './auth.service';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { UserRegisterDto } from './dto/user-register.dto';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
  ApiConflictResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiCreatedResponse({ description: 'Created' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiConflictResponse({ description: 'Email Already Exist' })
  @ApiBadRequestResponse({ description: 'Invalid Password' })
  async register(
    @Body() userRegisterDto: UserRegisterDto,
  ): Promise<UserEntity> {
    return await this.authService.register(userRegisterDto);
  }

  @Post('login')
  @ApiCreatedResponse({ description: 'Created Jwt' })
  @ApiNotFoundResponse({ description: 'User With This Email Not Found' })
  @ApiBadRequestResponse({ description: 'Invalid Password' })
  async login(@Body() userLoginDto: UserLoginDto): Promise<{ token: string }> {
    return await this.authService
      .login(userLoginDto)
      .then((jwt: string) => ({ token: jwt }));
  }
}
