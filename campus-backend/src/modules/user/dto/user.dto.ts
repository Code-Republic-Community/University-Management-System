import { Role } from '../../../constatns/role.enum';
import { AbstractDto } from '../../../common/abstract.dto';
import { UserEntity } from '../entities/user.entity';

export class UserDto extends AbstractDto {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  role: Role;

  constructor(user: UserEntity) {
    super(user);
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.password = user.password;
    this.role = user.role;
  }
}
