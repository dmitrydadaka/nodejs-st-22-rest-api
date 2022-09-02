import { GroupEntity } from "../data-access/group/group.entity";

export interface GroupRepository {
    getGroups();
    findOne(id: string);
    remove(id:string);
    update(id: string, user: typeof GroupEntity);
    create(group: typeof GroupEntity);
}
