import { type } from 'os';
import { Table, Column, Model, PrimaryKey, DataType } from 'sequelize-typescript';
import { Permission } from '../../interfaces/permission.interface';
@Table
export class GroupEntity extends Model {
  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false
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

}
