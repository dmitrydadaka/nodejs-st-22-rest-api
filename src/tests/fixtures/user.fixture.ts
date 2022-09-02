import { User } from "../../interfaces/user.interface";
import { PostSchema, PutSchema } from "../../validation/valid";

export const user: typeof PutSchema = {
    login: 'inkognito',
    password: "mockpass1",
    age: 24,
    isDeleted: false,
    id: '0f682e16-4d10-4b16-8999-acc596f435e6'
}

export const userforCreate: typeof PostSchema = {
    login: 'inkognito',
    password: "mockpass1",
    age: 24,
    isDeleted: false,
}
