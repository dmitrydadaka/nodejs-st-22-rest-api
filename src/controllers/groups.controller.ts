import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { GroupEntity } from '../data-access/group/group.entity';
import { LocalAuthGuard } from '../guards/local-auth.guards';

import { Group } from '../interfaces/group.interface';
import { GroupsService } from '../services/groups.service';

@Controller('v1/groups')
@UseGuards(LocalAuthGuard)
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

 /*  @Post(':id')
  async addUsersToGroup(
    @Param('id', ) id: string,
    @Body() userIds: string[]) {
    const group = await this.groupsService.addUsersToGroup(id, userIds);
    return group;
  } */

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return this.groupsService.remove(id);
  }

  @Put(':id')
  public async update(@Param('id') id: string, @Body() group: typeof GroupEntity) {
    return this.groupsService.update(id, group);
  }
}
