import { UpdateUserDto } from './dto/update-user.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { AuthService } from 'src/modules/auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    return this.authService.register(createUserDto);
  }

  async getById(userId: string): Promise<UserEntity> {
    return await this.userRepository
      .findOne(userId)
      .then((user: UserEntity) => {
        if (!user) {
          throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
        }
        return user;
      });
  }

  async getAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async update(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    await this.getById(userId);
    if (updateUserDto.password) {
      updateUserDto.password = await this.authService.hashPassword(
        updateUserDto.password,
      );
    }
    return await this.userRepository.update(userId, updateUserDto);
  }

  async delete(userId: string): Promise<void> {
    await this.getById(userId);
    await this.userRepository.delete(userId);
  }
}
