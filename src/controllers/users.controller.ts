import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { User } from '../interfaces/user.interface';
import { PostSchema, PutSchema } from '../helpers/valid';
import { LocalAuthGuard } from '../guards/local-auth.guards';

@Controller('v1/users')
@UseGuards(LocalAuthGuard)
export class UsersController {

  constructor(private readonly appService: UsersService) { }

  @Get()
  public async getAutoSuggestUsers(
    @Query('limit') limit: number = 5,
    @Query('loginSubstring') loginSubstring: string = ''
  ): Promise<User[]> {
    limit = limit > 5 ? 5 : limit;
    return this.appService.getUsers(Number(limit), loginSubstring);
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<User> {
    return this.appService.findOne(id);
  }

  @Post()
  public async create(@Body() user: User): Promise<User> {
    try {
      await PostSchema.validateAsync(user);
    }
    catch (err) {
      if (err) throw new BadRequestException(err.details[0].message)
    }
    return this.appService.create(user);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return this.appService.remove(id);
  }

  @Put(':id')
  public async update(@Param('id') id: string, @Body() user: typeof PutSchema) {
    try {
      await PutSchema.validateAsync(user);
    }
    catch (err) {
      if (err) throw new BadRequestException(err.details[0].message)
    }
    return this.appService.update(id, user);

  }
}
