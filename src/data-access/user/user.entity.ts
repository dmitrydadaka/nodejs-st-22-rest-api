import { Table, Column, Model, PrimaryKey, DataType } from 'sequelize-typescript';

@Table
export class UserEntity extends Model {
  
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false
  })
  login: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  password: string;

  @Column({
    type: DataType.SMALLINT,
    allowNull: false
  })
  age: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false
  })
  isDeleted: boolean;

  @PrimaryKey
  @Column({
    type: DataType.UUID,
    unique: true
  })
  id: string;

}
