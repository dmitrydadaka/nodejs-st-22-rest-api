import { PostSchema, PutSchema } from "../helpers/valid";
export interface Repository {
    getAutoSuggestUsers(limit:string, loginSubstring: string);
    findOne(id: string);
    remove(id:string);
    update(id: string, user: typeof PutSchema);
    create(id: string, user: typeof PostSchema);
}
