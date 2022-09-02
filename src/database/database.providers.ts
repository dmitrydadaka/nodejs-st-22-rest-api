import { Sequelize } from 'sequelize-typescript';
import { UserEntity } from '../data-access/user/user.entity';
import { GroupEntity } from '../data-access/group/group.entity';
import { UserGroup } from '../data-access/group/user-group.entity';


export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.host,
        port: Number(process.env.PORT),
        username: process.env.username_DB,
        password: process.env.password,
        database: process.env.database,
      });
      sequelize.addModels([UserEntity, GroupEntity, UserGroup]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
