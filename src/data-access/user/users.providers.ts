import { UserEntity } from './user.entity';

export const usersProviders = [
  {
    provide: 'User_REPOSITORY',
    useValue: UserEntity,
  },
];
