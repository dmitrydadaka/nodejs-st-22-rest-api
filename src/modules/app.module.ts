import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from '../controllers/users.controller';
import { UsersService } from '../services/users.service';
import { DatabaseModule } from '../database/database.module';
import { SequelizeUsersRepository } from '../repositories/sequelize-users-repository';
import { SequelizeGroupsRepository } from '../repositories/sequelize-groups-repository';
import { groupsProviders } from '../data-access/group/groups.providers';
import { usersProviders } from '../data-access/user/users.providers';
import { GroupsService } from '../services/groups.service';
import { GroupsController } from '../controllers/groups.controller';
import { LoggerMiddleware } from '../middlewares/logger.Middleware';
import { AllExceptionsFilter } from '../filters/all-exceptions.filter';
import { APP_FILTER } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../constants/const-for-jwt';
import { AuthService } from '../services/auth.service';
import { LocalStrategy } from '../strategies/local.strategy';
import { AuthController } from '../controllers/auth.controller';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath:'../.env', isGlobal: true }),
    DatabaseModule,
    PassportModule,
    JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '60s' }
  })],
  controllers: [UsersController, GroupsController, AuthController],
  providers: [UsersService,
    GroupsService,
    ...usersProviders,
    ...groupsProviders,
    SequelizeUsersRepository,
    SequelizeGroupsRepository,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    }
    ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('/');
  }
}
