import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { Transaction } from 'sequelize/types';
import { GroupEntity } from '../data-access/group/group.entity';
import { UserGroup } from '../data-access/group/user-group.entity';
import { UserEntity } from '../data-access/user/user.entity';
import { Group } from '../interfaces/group.interface';
import { GroupsService } from '../services/groups.service';
import { UsersService } from '../services/users.service';

@Controller()
export class GroupsController {

  constructor(private readonly groupsService: GroupsService) { }

  @Get()
  public async getGroups(): Promise<Group[]> {
    return this.groupsService.getUsers();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<Group> {
    return this.groupsService.findOne(id);
  }

  @Post()
  public async create(@Body() group: typeof GroupEntity): Promise<Group> {
    return this.groupsService.create(group);
  }

  @Post(':id')
  async addUsersToGroup(
    @Param('id', ) id: string,
    @Body() userIds: string[]) {
    const group = await this.groupsService.addUsersToGroup(id, userIds);
    return group;
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return this.groupsService.remove(id);
  }

  @Put(':id')
  public async update(@Param('id') id: string, @Body() group: typeof GroupEntity) {
    return this.groupsService.update(id, group);
  }
}
