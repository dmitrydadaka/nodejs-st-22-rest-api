import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { SequelizeRepository } from './repository/sequelize-repository';
import { usersProviders } from './users.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
  providers: [AppService,
  ...usersProviders,
  SequelizeRepository],
})
export class AppModule {}
