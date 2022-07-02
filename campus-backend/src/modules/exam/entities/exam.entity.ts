import { UserEntity } from 'src/modules/user/entities/user.entity';
import { DepartmentEntity } from 'src/modules/department/entities/department.entity';
import { AbstractEntity } from '../../../common/abstract.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Role } from 'src/constatns/role.enum';

@Entity('exams')
export class ExamEntity extends AbstractEntity {
  @IsNotEmpty()
  @Column({ type: 'varchar', length: 50 })
  subject_name: string;

  @ManyToOne(
    () => UserEntity,
    (userentity) => {
      if (userentity.role === Role.STUDENT) return userentity.id;
    },
  )
  student: UserEntity;

  @IsNotEmpty()
  @Column()
  schedule: string;

  @ManyToOne(() => DepartmentEntity, (department) => department.exams)
  department: DepartmentEntity;
}
