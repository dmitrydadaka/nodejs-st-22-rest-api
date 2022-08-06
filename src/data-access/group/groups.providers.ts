import { GroupEntity } from './group.entity';

export const groupsProviders = [
  {
    provide: 'Group_REPOSITORY',
    useValue: GroupEntity,
  },
];
