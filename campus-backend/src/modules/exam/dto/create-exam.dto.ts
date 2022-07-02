import { UserEntity } from 'src/modules/user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
export class CreateExamDto {
  @ApiProperty()
  @IsNotEmpty()
  subject_name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  studentID: UserEntity;

  @ApiProperty()
  @IsNotEmpty()
  schedule: string;
}
