import { Role } from './../../../constatns/role.enum';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserRegisterDto {
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsDefined()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @Matches(/((?=.*\W+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]))/, {
    message: 'invalid password',
  })
  password: string;

  @ApiProperty()
  role: Role;
}
