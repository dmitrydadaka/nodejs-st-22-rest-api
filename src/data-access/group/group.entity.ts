import { Table, Column, Model, PrimaryKey, DataType, BelongsToMany } from 'sequelize-typescript';
import { Permission } from '../../interfaces/permission.interface';
import { UserEntity } from '../user/user.entity';
import { UserGroup } from './user-group.entity';
@Table
export class GroupEntity extends Model {
  @Column({
    type: DataType.ARRAY(DataType.STRING)
  })
  permissions: Array<Permission>

  @Column({
      type: DataType.STRING,
      allowNull: false 
  })
  name: string;

  @PrimaryKey
  @Column({
    type: DataType.UUID,
    unique:true
  })
  id: string;

  @BelongsToMany(() => UserEntity, () => UserGroup)
  users: UserEntity[];

}
