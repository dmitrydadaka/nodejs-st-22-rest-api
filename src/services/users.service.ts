import { Injectable } from '@nestjs/common';
import { PostSchema, PutSchema } from '../helpers/valid';
import { SequelizeUsersRepository } from '../repositories/sequelize-users-repository';
import { User } from '../interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(
  private sequelizeUsersRepository: SequelizeUsersRepository) { }

  public async getUsers(limit, loginSubstring): Promise<User[]> {
    return this.sequelizeUsersRepository.getUsers(limit, loginSubstring)
  }

  public async findOne(id: string): Promise<User> {
    return this.sequelizeUsersRepository.findOne(id);
  }

  public async create(user: typeof PostSchema): Promise<User> {
    return this.sequelizeUsersRepository.create(user);
  }

  public async remove(id: string) {
    return this.sequelizeUsersRepository.remove(id);
  }

  public async update(id: string, user: typeof PutSchema) {
    return this.sequelizeUsersRepository.update(id, user);
  }  
}