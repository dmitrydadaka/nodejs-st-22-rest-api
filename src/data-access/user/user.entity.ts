import { Table, Column, Model, PrimaryKey, BelongsToMany } from 'sequelize-typescript';
import { GroupEntity } from '../group/group.entity';
import { UserGroup } from '../group/user-group.entity';

@Table
export class UserEntity extends Model {
  
  @Column
  login: string;

  @Column
  password: string;

  @Column
  age: number;

  @Column
  isDeleted: boolean;

  @PrimaryKey
  @Column
  id: string;

  @BelongsToMany(() => GroupEntity, () => UserGroup)
  groups: GroupEntity[];

}
