import { AbstractEntity } from '../../../common/abstract.entity';
import { Column, Entity, Unique } from 'typeorm';
import { Role } from 'src/constatns/role.enum';

@Entity('users')
@Unique(['email'])
export class UserEntity extends AbstractEntity {
  @Column({ type: 'varchar' })
  firstName: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ select: false, type: 'varchar' })
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.ADMIN })
  role: Role;
}
