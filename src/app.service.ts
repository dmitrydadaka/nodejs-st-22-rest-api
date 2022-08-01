import { Inject, Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { SequelizeRepository } from './repository/sequelize-repository';
import { PostSchema, PutSchema } from './helpers/valid';
import { UserEntity } from './user.entity';
import { where } from 'sequelize/types';

@Injectable()
export class AppService {

  constructor(@Inject('User_REPOSITORY')
  private usersRepository: typeof UserEntity) { }

  public async findAll():  Promise<UserEntity[]> {
    return this.usersRepository.findAll();
  }

  public async findOne(id: string): Promise<UserEntity> {  
    return this.usersRepository.findOne<UserEntity>({where: {id}});
  }

  public async create(user: typeof PostSchema): Promise<UserEntity> {
    return this.usersRepository.create<UserEntity>(user);
  }

  public async remove(id:string, num: number): Promise<number> {
    await UserEntity.destroy({
      where: {
        id: id
      },
      force: true
    });
    return this.usersRepository.destroy<UserEntity>({where:{id}});
  }

 /*  public update(id: string, user: typeof PutSchema): Promise<UserEntity> {
  return this.usersRepository.update<UserEntity>(user, {where:{id}});
  } */
}
