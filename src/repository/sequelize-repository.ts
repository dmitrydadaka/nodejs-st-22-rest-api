import { Inject, Injectable, NotFoundException, UnprocessableEntityException } from "@nestjs/common";
import { Repository } from "../interfaces/repository.interface";
import { User } from "../interfaces/user.interface";
import { v4 as uuidv4 } from 'uuid';
import { PutSchema } from "../helpers/valid";
import { UserEntity } from "../user.entity";

@Injectable()
class SequelizeRepository implements Repository {
    
    getAutoSuggestUsers(users, limit, loginSubstring) {
        return users.sort((a, b) => a.login.localeCompare(b.login)).filter(u => u.isDeleted === false).filter(user => user.login.includes(loginSubstring)).slice(0, limit);
    }

}
export { SequelizeRepository };
