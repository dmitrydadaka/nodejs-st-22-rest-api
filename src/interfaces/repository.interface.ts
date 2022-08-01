import { PostSchema, PutSchema } from "../helpers/valid";

export interface Repository {
    getAutoSuggestUsers(limit:string, loginSubstring: string);
    findOne(id: string);
    update(id:string, user: typeof PutSchema);
    remove(id:string);
    create(user: typeof PostSchema);
}