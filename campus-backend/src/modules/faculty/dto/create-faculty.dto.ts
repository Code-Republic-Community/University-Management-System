import { ApiProperty } from '@nestjs/swagger';
export class CreateFacultyDto {
  @ApiProperty()
  faculty_name: string;
}
