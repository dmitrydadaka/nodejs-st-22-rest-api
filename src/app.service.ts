import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { User } from './model';
import { v4 as uuidv4} from 'uuid';

@Injectable()
export class AppService {
  private users: User[] = [];

  public getUsers(limit, loginSubstring): User[] {
    return this.users.sort((a,b) => a.login.localeCompare(b.login)).filter( u => u.isDeleted === false ).filter( user => user.login.includes(loginSubstring)).slice(0, limit);
  }

  public findOne(id: string): User {
    const user: User = this.users.find(user => user.id === id);
  
    if (!user) {
      throw new NotFoundException('User not found.');
    }
  
    return user;
  }

  public create(user: User): User {
   
    const newUser: User = {...user, id: uuidv4()}
    this.users.push(newUser);

    return newUser;
  }

  public remove(id: string): User {
    const userIndex: number = this.users.findIndex( user => user.id === id );

    if (userIndex === -1) {
      throw new NotFoundException('User not found.');      
    }
    this.users[userIndex] = {...this.users[userIndex], isDeleted: true}
    return this.users[userIndex];
  }

  public update(id: string, user: User): User {
    
    const userIndex: number = this.users.findIndex( user => user.id === id);

    if (userIndex === -1) {
      throw new NotFoundException('User not found.');
    }
  
    const loginExists: boolean = this.users.some(
      user => user.login === user.login && user.id !== id,
    );
    if (loginExists) {
      throw new UnprocessableEntityException('User login already exists.');
    }
  
    const updateUser: User = {
      ...user,
      id
    };
    this.users[userIndex] = updateUser;
  
    return updateUser;
  }
}
