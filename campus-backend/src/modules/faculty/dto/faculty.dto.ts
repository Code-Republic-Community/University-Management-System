import { DepartmentDto } from './../../department/dto/departament.dto';
import { AbstractDto } from '../../../common/abstract.dto';
export class FacultyDto extends AbstractDto {
  faculty_name: string;
  departments: DepartmentDto[];
}
