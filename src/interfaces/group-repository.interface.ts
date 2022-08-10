import { GroupEntity } from "../data-access/group/group.entity";

export interface GroupRepository {
    getUsers();
    findOne(id: string);
    remove(id:string);
    update(id: string, user: typeof GroupEntity);
    create(group: typeof GroupEntity);
}
