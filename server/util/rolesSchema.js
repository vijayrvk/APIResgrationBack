const Joi = require('joi');

const createRoleSchema = Joi.object({
    name: Joi.string().required(),
    isActive: Joi.boolean(),
    isDelete: Joi.boolean(),
    access: Joi.object(),
    createdBy: Joi.string(),
    createdAt: Joi.date().timestamp(),
    updatedBy: Joi.string(),
    updateAt: Joi.date().timestamp()
});
const updateRoleSchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    isActive: Joi.boolean(),
    access: Joi.object(),
    isDelete: Joi.boolean(),
    createdBy: Joi.string(),
    createdAt: Joi.date().timestamp(),
    updatedBy: Joi.string(),
    updateAt: Joi.date().timestamp()
});
const getRoleSchema = Joi.object({
    id: Joi.string().required()
});


module.exports = {
    createRoleSchema: createRoleSchema,
    updateRoleSchema: updateRoleSchema,
    getRoleSchema: getRoleSchema
};