import { Inject, Injectable, NotFoundException, UnprocessableEntityException } from "@nestjs/common";
import { Repository } from "../interfaces/repository.interface";
import { User } from "../interfaces/user.interface";
import { v4 as uuidv4 } from 'uuid';
import { PutSchema } from "../helpers/valid";
import { UserEntity } from "../user.entity";

@Injectable()
class SequelizeRepository implements Repository {
    private users: User[] = [];
    
    getAutoSuggestUsers(limit, loginSubstring) {
        return this.users.sort((a, b) => a.login.localeCompare(b.login)).filter(u => u.isDeleted === false).filter(user => user.login.includes(loginSubstring)).slice(0, limit);
    }
    findOne(id: string) { 
        const user: User = this.users.find(user => user.id === id);

        if (!user) {
            throw new NotFoundException('User not found.');
        }

        return user;
    }
    update(id: string, user: typeof PutSchema) {

        const userIndex: number = this.users.findIndex(user => user.id === id);

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
    remove(id: string) {
        const userIndex: number = this.users.findIndex(user => user.id === id);

        if (userIndex === -1) {
            throw new NotFoundException('User not found.');
        }
        this.users[userIndex] = { ...this.users[userIndex], isDeleted: true }
        return this.users[userIndex];
    }
    create(user: User) {
        const newUser: User = { ...user, id: uuidv4() }
        this.users.push(newUser);
        return newUser;
    }
}
export { SequelizeRepository };
