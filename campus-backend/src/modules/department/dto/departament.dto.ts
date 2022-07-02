import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from '../../../common/abstract.dto';
export class DepartmentDto extends AbstractDto {
  @ApiProperty()
  department_name: string;

  @ApiProperty()
  schedule: string;

  @ApiProperty()
  departmentID: string;
}
