import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from '../../../common/abstract.dto';
export class ExamDto extends AbstractDto {
  @ApiProperty()
  subject_name: string;

  @ApiProperty()
  schedule: string;

  @ApiProperty()
  studentID: string;
}
