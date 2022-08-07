import { Inject, Injectable } from "@nestjs/common";
import { GroupRepository } from "../interfaces/group-repository.interface";
import { v4 as uuidv4 } from 'uuid';
import { PostSchema, PutSchema } from "../helpers/valid";
import { GroupEntity } from "../data-access/group/group.entity";

@Injectable()
class SequelizeGroupsRepository implements GroupRepository {

    constructor(@Inject('Group_REPOSITORY')
    private groupsRepository: typeof GroupEntity
    ) { }
    
    public async getUsers() {
        return await this.groupsRepository.findAll()           
    }
    
    public async findOne(id: string): Promise<GroupEntity> {
        return  this.groupsRepository.findOne<GroupEntity>({ where: { id }});
    }

    public async create(group: typeof GroupEntity): Promise<GroupEntity> {
        return await this.groupsRepository.create<GroupEntity>({ id: uuidv4(), ...group });
    }

    public async remove(id: string) {
        await  this.groupsRepository.destroy({where: {id}});
    }

    public async update(id: string, user: typeof GroupEntity) {
        return await this.groupsRepository.update({ id, ...user }, { where: { id } });
    }

}
export { SequelizeGroupsRepository };
