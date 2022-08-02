import { Inject, Injectable, NotFoundException, UnprocessableEntityException } from "@nestjs/common";
import { Repository } from "../interfaces/repository.interface";
import { v4 as uuidv4 } from 'uuid';
import { PostSchema, PutSchema } from "../helpers/valid";
import { UserEntity } from "../user.entity";

@Injectable()
class SequelizeRepository implements Repository {

    constructor(@Inject('User_REPOSITORY')
    private usersRepository: typeof UserEntity) { }
    
    public async getAutoSuggestUsers(limit, loginSubstring) {
        return await this.usersRepository.findAll()
            .then((users) => users.sort((a, b) => a.login.localeCompare(b.login))
            .filter(u => u.isDeleted === false).filter(user => user.login.includes(loginSubstring)).slice(0, limit));
    }
    public async findOne(id: string): Promise<UserEntity> {
        return  this.usersRepository.findOne<UserEntity>({ where: { id } });
    }

    public async create(user: typeof PostSchema): Promise<UserEntity> {
        return await this.usersRepository.create<UserEntity>({ id: uuidv4(), ...user });
    }

    public async remove(id: string): Promise<number> {
        return await this.usersRepository.destroy({
            where: {
                id: id
            }
        });
    }

    public async update(id: string, user: typeof PutSchema) {
        return await this.usersRepository.update({ id, ...user }, { where: { id } });
    }

}
export { SequelizeRepository };
