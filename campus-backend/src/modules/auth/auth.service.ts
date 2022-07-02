import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from 'src/modules/auth/dto/user-login.dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Repository } from 'typeorm';
import { UserRegisterDto } from './dto/user-register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async register(userRegisterDto: UserRegisterDto): Promise<UserEntity> {
    const hashedPassword = await this.hashPassword(userRegisterDto.password);
    await this.uniqueEmail(userRegisterDto.email);
    userRegisterDto.password = hashedPassword;
    return await this.userRepository
      .save(userRegisterDto)
      .then((person) => {
        delete person.password;
        return person;
      })
      .catch(() => {
        throw new HttpException(
          'Role has been ADMIN or STUDENT or TEACHER',
          HttpStatus.BAD_REQUEST,
        );
      });
  }
  async login(loginUserDto: UserLoginDto): Promise<string> {
    const user = await this.findByLogin(loginUserDto);
    return await this.jwtService.signAsync({ user });
  }
  async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }
  async uniqueEmail(email: string) {
    const unique = await this.userRepository.findOne({
      where: { email },
    });
    if (unique) {
      throw new HttpException('email already exist', HttpStatus.CONFLICT);
    }
    return unique;
  }
  async findByLogin({ email, password }: UserLoginDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne(
      { email },
      {
        select: ['id', 'firstName', 'lastName', 'email', 'password', 'role'],
      },
    );
    if (!user) {
      throw new HttpException(
        'User with this email not found',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }
    delete user.password;
    return user;
  }
}
