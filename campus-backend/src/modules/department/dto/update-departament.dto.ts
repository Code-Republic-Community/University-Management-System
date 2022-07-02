import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateDepartmentDto {
  @ApiProperty({ required: false })
  @IsOptional()
  department_name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  facultyID: string;
}
