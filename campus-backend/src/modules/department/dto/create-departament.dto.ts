import { ApiProperty } from '@nestjs/swagger';
export class CreateDepartmentDto {
  @ApiProperty()
  department_name: string;

  @ApiProperty()
  schedule: string;
}
