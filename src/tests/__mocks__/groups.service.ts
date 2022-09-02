import { Injectable } from '@nestjs/common';


@Injectable()
export class UsersService { 
  gerGroups = jest.fn();
  
  findOne = jest.fn();

  create = jest.fn();

  remove = jest.fn();

  update =jest.fn();
}
