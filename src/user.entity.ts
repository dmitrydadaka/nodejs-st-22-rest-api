import { Table, Column, Model } from 'sequelize-typescript';

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

  @Column
  primaryKey: true;
  id: string;

}