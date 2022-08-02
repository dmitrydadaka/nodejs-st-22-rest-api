import { Inject, Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { v4 as uuidv4 } from 'uuid';
import { UserEntity } from './user.entity';
import { PostSchema, PutSchema } from './helpers/valid';
import { SequelizeRepository } from './repository/sequelize-repository';

@Injectable()
export class AppService {
  constructor(@Inject('User_REPOSITORY')
  private usersRepository: typeof UserEntity,
  private sequelizeRepository: SequelizeRepository) { }

  public async getUsers(limit, loginSubstring): Promise<UserEntity[]> {
    return await this.sequelizeRepository.getAutoSuggestUsers(limit, loginSubstring)
  }

  public async findOne(id: string): Promise<UserEntity> {
    return this.sequelizeRepository.findOne(id);
  }

  public async create(user: typeof PostSchema): Promise<UserEntity> {
    return await this.sequelizeRepository.create(user);
  }

  public async remove(id: string): Promise<number> {
    return await this.sequelizeRepository.remove(id);
  }

  public async update(id: string, user: typeof PutSchema) {
    return await this.sequelizeRepository.update(id, user);
  }  
}
