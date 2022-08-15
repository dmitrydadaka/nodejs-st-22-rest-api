import { Injectable } from '@nestjs/common';
import { SequelizeGroupsRepository } from '../repositories/sequelize-groups-repository';
import { Group } from '../interfaces/group.interface';
import { GroupEntity } from '../data-access/group/group.entity';
import { Transaction } from 'sequelize/types';

@Injectable()
export class GroupsService {
  constructor(
  private sequelizeGroupsRepository: SequelizeGroupsRepository) { }

  public async getUsers(): Promise<Group[]> {
    return this.sequelizeGroupsRepository.getUsers()
  }

  public async findOne(id: string): Promise<Group> {
    return this.sequelizeGroupsRepository.findOne(id);
  }

  public async create(group: typeof GroupEntity): Promise<Group> {
    return this.sequelizeGroupsRepository.create(group);
  }

  public async remove(id: string) {
    return this.sequelizeGroupsRepository.remove(id);
  }

  public async update(id: string, group: typeof GroupEntity) {
    return this.sequelizeGroupsRepository.update(id, group);
  }  

 /*  public async addUsersToGroup(id: string, userIds: string[]) {
    return this.sequelizeGroupsRepository.addUsersToGroup(id, userIds)
  } */
}