import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';

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

}
