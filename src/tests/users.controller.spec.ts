import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../controllers/users.controller';
import { UsersService } from '../services/users.service';
import { user, userforCreate } from "./fixtures/user.fixture";

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

  it('return one user by id', async () => {
    service.findOne.mockResolvedValue(user);
    expect(await controller.findOne(user.id)).toBe(user);
  });

  it('use false id for checking result', async () => {
    service.findOne.mockResolvedValue(null);
    try {
      await controller.findOne(user.id)
    } catch (err) {
      expect(err).toBeInstanceOf(HttpException);
      expect(err).toHaveProperty('status', 404);
    }
  });

  it('update user', async () => {
    service.update.mockResolvedValue(user);
    expect(await controller.update(user.id, user)).toBe(user);
  });

  it('use null for checking result when update user', async () => {
    service.update.mockResolvedValue(null);
    try {
      await controller.update(user.id, user);
    } catch (err) {
      expect(err).toBeInstanceOf(HttpException);
      expect(err).toHaveProperty('status', 404);
    }
  });

  it('create user', async () => {
    service.create.mockResolvedValue(userforCreate);
    expect(await controller.create(userforCreate)).toBe(userforCreate);
  });

  it('use null for checking result when create user', async () => {
    service.create.mockResolvedValue(null);
    try {
      await controller.create(userforCreate);
    } catch (err) {
      expect(err).toBeInstanceOf(HttpException);
      expect(err).toHaveProperty('status', 400);
    }
  });

  it('remove user', async () => {
    service.remove.mockResolvedValue(user);
    expect(await controller.remove(user.id)).toBe(undefined);
  });

});
