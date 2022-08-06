import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';
import { Permission } from '../../interfaces/permission.interface';
@Table
export class GroupEntity extends Model {
  
  @Column
  permissions: Array<Permission>

  @Column
  name: string;

  @PrimaryKey
  @Column
  id: string;

}
