import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { DatabaseModule } from './database/database.module';
import { SequelizeUsersRepository } from './repositories/sequelize-users-repository';
import { SequelizeGroupsRepository } from './repositories/sequelize-groups-repository';
import { groupsProviders } from './data-access/group/groups.providers';
import { usersProviders } from './data-access/user/users.providers';
import { GroupsService } from './services/groups.service';
import { GroupsController } from './controllers/groups.controller';
import { LoggerMiddleware } from './middlewares/logger.Middleware';
@Module({
  imports: [DatabaseModule],
  controllers: [UsersController, GroupsController],
  providers: [UsersService,
    GroupsService,
    ...usersProviders,
    ...groupsProviders,
    SequelizeUsersRepository,
    SequelizeGroupsRepository,
    ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('/');
  }
}