import { AbstractEntity } from '../../../common/abstract.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { DepartmentEntity } from 'src/modules/department/entities/department.entity';

@Entity('faculties')
export class FacultyEntity extends AbstractEntity {
  @IsNotEmpty()
  @Column()
  faculty_name: string;

  @OneToMany(
    () => DepartmentEntity,
    (departmentEntity) => departmentEntity.faculty,
  )
  departments: DepartmentEntity[];
}
