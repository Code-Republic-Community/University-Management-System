import { ExamEntity } from './../../exam/entities/exam.entity';
import { AbstractEntity } from '../../../common/abstract.entity';
import { IsNotEmpty } from 'class-validator';
import { FacultyEntity } from '../../faculty/entities/faculty.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity('departments')
export class DepartmentEntity extends AbstractEntity {
  @IsNotEmpty()
  @Column()
  department_name: string;

  @ManyToOne(() => FacultyEntity, (faculty) => faculty.departments)
  faculty: FacultyEntity;

  @OneToMany(() => ExamEntity, (exam) => exam.department)
  exams: ExamEntity[];
}
