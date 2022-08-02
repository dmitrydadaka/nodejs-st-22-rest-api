import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';

@Table
export class UserEntity extends Model {
  @PrimaryKey
  @Column
  login: string;

  @Column
  password: string;

  @Column
  age: number;

  @Column
  isDeleted: boolean;

  @Column
  primaryKey: true;
  id: string;

}
