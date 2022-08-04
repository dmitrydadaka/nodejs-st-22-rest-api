import { Injectable } from '@nestjs/common';
import { PostSchema, PutSchema } from '../helpers/valid';
import { SequelizeRepository } from '../repository/sequelize-repository';
import { User } from '../interfaces/user.interface';

@Injectable()
export class AppService {
  constructor(
  private sequelizeRepository: SequelizeRepository) { }

  public async getUsers(limit, loginSubstring): Promise<User[]> {
    return await this.sequelizeRepository.getUsers(limit, loginSubstring)
  }

  public async findOne(id: string): Promise<User> {
    return this.sequelizeRepository.findOne(id);
  }

  public async create(user: typeof PostSchema): Promise<User> {
    return await this.sequelizeRepository.create(user);
  }

  public async remove(id: string) {
    return await this.sequelizeRepository.remove(id);
  }

  public async update(id: string, user: typeof PutSchema) {
    return await this.sequelizeRepository.update(id, user);
  }  
}