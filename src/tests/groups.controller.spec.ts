import { Test, TestingModule } from '@nestjs/testing';
import { GroupsController } from '../controllers/groups.controller';
import { GroupsService } from '../services/groups.service';
import { group } from './fixtures/group.fixture';

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

 
});
