import { Role } from '../../../constatns/role.enum';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(/((?=.*\W+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]))/, {
    message: 'invalid password',
  })
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  role: Role;
}
