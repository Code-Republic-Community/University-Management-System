import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
export class UpdateExamDto {
  @ApiProperty({ required: false })
  @IsOptional()
  subject_name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  schedule: string;

  // @ApiProperty({ required: false })
  // @IsOptional()
  // studentID: string;
}
