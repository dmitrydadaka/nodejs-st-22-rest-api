import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../controllers/users.controller';
import { UsersService } from '../services/users.service';
import { user } from "./fixtures/user.fixture";

jest.mock('../services/users.service');

describe('UsersController', () => {
  let controller: UsersController;
  let service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);

  });

  it('return all users', async () => {
    service.getUsers.mockResolvedValue([user]);
    const result = await controller.getAutoSuggestUsers();
    expect(result).toStrictEqual([user]);
  });
});
