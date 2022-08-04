import { Injectable } from '@nestjs/common';
import { PostSchema, PutSchema } from '../helpers/valid';
import { SequelizeRepository } from '../repository/sequelize-repository';
import { User } from '../interfaces/user.interface';

@Injectable()
export class AppService {
  constructor(
  private sequelizeRepository: SequelizeRepository) { }

  public async getUsers(limit, loginSubstring): Promise<User[]> {
    return this.sequelizeRepository.getUsers(limit, loginSubstring)
  }

  public async findOne(id: string): Promise<User> {
    return this.sequelizeRepository.findOne(id);
  }

  public async create(user: typeof PostSchema): Promise<User> {
    return this.sequelizeRepository.create(user);
  }

  public async remove(id: string) {
    return this.sequelizeRepository.remove(id);
  }

  public async update(id: string, user: typeof PutSchema) {
    return this.sequelizeRepository.update(id, user);
  }  
}