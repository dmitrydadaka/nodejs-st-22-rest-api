import { Sequelize } from 'sequelize-typescript';
import { UserEntity } from '../data-access/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '123',
        database: 'Users',
      });
      sequelize.addModels([UserEntity]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
