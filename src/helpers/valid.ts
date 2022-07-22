import * as Joi from '@hapi/joi';

export const PutSchema = Joi.object({
    id: Joi.required(),
    login: Joi.string().required(),
    password: Joi.string(),//.pattern(new RegExp('^[a-zA-Z0-9]{2,}$')),
    age: Joi.number().min(4).max(130).required(),
    isDeleted: Joi.boolean().required()
});

export const PostSchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string(),//.pattern(new RegExp('^[a-zA-Z0-9]]{2,}$')),
    age: Joi.number().min(4).max(130).required(),
    isDeleted: Joi.boolean().required()
});