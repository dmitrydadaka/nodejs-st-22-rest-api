import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { UserEntity } from '../user/user.entity';
import { GroupEntity } from './group.entity';

@Table
export class UserGroup extends Model {
  @ForeignKey(() => UserEntity)
  @Column
  userId: string;

  @ForeignKey(() => GroupEntity)
  @Column
  groupId: string;
}
