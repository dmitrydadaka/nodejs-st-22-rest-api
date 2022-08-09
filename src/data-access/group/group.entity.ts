import { Table, Column, Model, PrimaryKey, BelongsToMany, DataType } from 'sequelize-typescript';
import { Permission } from '../../interfaces/permission.interface';
import { UserEntity } from '../user/user.entity';
import { UserGroup } from './user-group.entity';
@Table
export class GroupEntity extends Model {
  
  @Column({ type: DataType.ARRAY(DataType.TEXT) })
  permissions: Array<Permission>;

  @Column
  name: string;

  @PrimaryKey
  @Column
  id: string;

  @BelongsToMany(() => UserEntity, () => UserGroup)
  users: UserEntity[];

}
