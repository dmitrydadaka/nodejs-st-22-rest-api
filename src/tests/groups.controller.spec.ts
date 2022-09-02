import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { GroupsController } from '../controllers/groups.controller';
import { GroupsService } from '../services/groups.service';
import { group } from './fixtures/group.fixture';

jest.mock('../services/groups.service');

describe('GroupsController', () => {
  let controller: GroupsController;
  let service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupsController],
      providers: [GroupsService],
    }).compile();

    controller = module.get<GroupsController>(GroupsController);
    service = module.get<GroupsService>(GroupsService);

  });

  it('return all groups', async () => {
    service.getGroups.mockResolvedValue([group]);
    const result = await controller.getGroups();
    expect(result).toStrictEqual([group]);
  });

  it('return one group by id', async () => {
    service.findOne.mockResolvedValue(group);
    expect(await controller.findOne(group.id)).toBe(group);  
  });

  it('use false id for checking result', async () => {
    service.findOne.mockResolvedValue(null);
    try {
      await controller.findOne(group.id)
    } catch (err) {
      expect(err).toBeInstanceOf(HttpException);
      expect(err).toHaveProperty('status', 404);
    }
  });

 /*  it('update group', async () => {
    service.update.mockResolvedValue(group);
    expect(await controller.update(group.id, group)).toBe(group);
  });

  it('use null for checking result when update group', async () => {
    service.update.mockResolvedValue(null);
    try {
      await controller.update(group.id, group);
    } catch (err) {
      expect(err).toBeInstanceOf(HttpException);
      expect(err).toHaveProperty('status', 404);
    }
  }); */

/*   it('create group', async () => {
    service.create.mockResolvedValue(group);
    expect(await controller.create(group)).toBe(group);
  });

  it('use null for checking result when create group', async () => {
    service.create.mockResolvedValue(null);
    try {
      await controller.create(group);
    } catch (err) {
      expect(err).toBeInstanceOf(HttpException);
      expect(err).toHaveProperty('status', 400);
    }
  }); */

  it('remove group', async () => {
    service.remove.mockResolvedValue(group);
    expect(await controller.remove(group.id)).toBe(undefined);
  });
});
