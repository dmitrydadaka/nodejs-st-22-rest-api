import * as Joi from '@hapi/joi';

export const PutSchema = Joi.object({
    id: Joi.required(),
    login: Joi.string().required(),
    password: Joi.string().pattern(new RegExp('([0-9].*[a-zA-Z])|([a-zA-Z].*[0-9])')).required(),
    age: Joi.number().min(4).max(130).required(),
    isDeleted: Joi.boolean().required()
});

export const PostSchema = Joi.object({
    login: Joi.string().required(),
        password: Joi.string().pattern(new RegExp('([0-9].*[a-zA-Z])|([a-zA-Z].*[0-9])')),
    age: Joi.number().min(4).max(130).required(),
    isDeleted: Joi.boolean().required()
});
