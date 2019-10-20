const Joi = require('joi');



const createUserSchema = Joi.object({
    name: Joi.string().required(),
    loginId: Joi.string().email().required(),
    password: Joi.string().required(),
    modules: Joi.array(),
    roleId: Joi.string().required(),
    isActive: Joi.boolean()
})
const updateUserSchema = Joi.object({
    name: Joi.string().required(),
    loginId: Joi.string().email().required(),
    roleId: Joi.string().required(),
    password: Joi.string(),
    modules: Joi.array(),
    isActive: Joi.boolean(),
    edited: Joi.boolean(),
    updatedBy: Joi.string(),
    id: Joi.string()
})
const getUserSchema = Joi.object({
    id: Joi.string().required()
})


module.exports = {
    createUserSchema: createUserSchema,
    updateUserSchema: updateUserSchema,
    getUserSchema: getUserSchema
};