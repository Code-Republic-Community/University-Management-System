import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
export class UpdateFacultyDto {
  @ApiProperty({ required: false })
  @IsOptional()
  faculty_name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  facultyID: string;
}
