import { ApiProperty } from '@nestjs/swagger';
import { Matches, IsEmail, IsOptional } from 'class-validator';
export class UpdateUserDto {
  @ApiProperty({ required: false })
  @IsOptional()
  firstName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  lastName: string;

  @ApiProperty({ required: false })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Matches(/((?=.*\W+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]))/, {
    message: 'invalid password',
  })
  password: string;
}
