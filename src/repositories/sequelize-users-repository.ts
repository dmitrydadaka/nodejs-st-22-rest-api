import { Inject, Injectable } from "@nestjs/common";
import { UserRepository } from "../interfaces/user-repository.interface";
import { v4 as uuidv4 } from 'uuid';
import { PostSchema, PutSchema } from "../helpers/valid";
import { UserEntity } from "../data-access/user/user.entity";
import { GroupEntity } from "../data-access/group/group.entity";

@Injectable()
class SequelizeUsersRepository implements UserRepository {

    constructor(@Inject('User_REPOSITORY')
    private usersRepository: typeof UserEntity
    ) { }
    
    public async getUsers(limit, loginSubstring) {
        return await this.usersRepository.findAll({where: {isDeleted: false}})
            .then((users) => users.sort((a, b) => a.login.localeCompare(b.login))
            .filter(u => u.isDeleted === false).filter(user => user.login.includes(loginSubstring)).slice(0, limit));
    }
    
    public async findOne(id: string): Promise<UserEntity> {
        return  this.usersRepository.findOne<UserEntity>({ where: { id }});
    }
    public async findOneForLogin(login: string): Promise<UserEntity> {
        return  this.usersRepository.findOne<UserEntity>({where:{login}});
    }

    public async create(user: typeof PostSchema): Promise<UserEntity> {
        return await this.usersRepository.create<UserEntity>({ id: uuidv4(), ...user });
    }

    public async remove(id: string) {
        await  this.usersRepository.update({isDeleted: true}, {where: {id}});
    }

    public async update(id: string, user: typeof PutSchema) {
        return await this.usersRepository.update({ id, ...user }, { where: { id } });
    }

}
export { SequelizeUsersRepository };
