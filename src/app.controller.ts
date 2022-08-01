import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './interfaces/user.interface';
import { PostSchema, PutSchema } from './helpers/valid';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  public async getAutoSuggestUsers(){
 /*    @Query('limit') limit: number = 5,
    @Query('loginSubstring') loginSubstring: string = ''
  ): Promise<User[]> {
    limit = limit > 5 ? 5 : limit; */
    return await this.appService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<User> {
    return await this.appService.findOne(id);
  }

  @Post()
  public async create(@Body() user: typeof PostSchema): Promise<User> {
    try {
      await PostSchema.validateAsync(user);
    }
    catch (err) {
      if (err) throw new BadRequestException(err.details[0].message)
    }
    return await this.appService.create(user);
  }

 /*  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<User> {
    return await this.appService.remove(id);
  }

  @Put(':id')
  public async update(@Param('id') id: string, @Body() user: typeof PutSchema): Promise<User> {
    try {
      await PutSchema.validateAsync(user);
    }
    catch (err) {
      if (err) throw new BadRequestException(err.details[0].message)
    }
    return await this.appService.update(id, user); }*/

  
}
