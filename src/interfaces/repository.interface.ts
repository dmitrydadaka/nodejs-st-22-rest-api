import { PostSchema, PutSchema } from "../helpers/valid";
import { User } from "./user.interface";

export interface Repository {
    getAutoSuggestUsers(users: User[], limit:string, loginSubstring: string);
}