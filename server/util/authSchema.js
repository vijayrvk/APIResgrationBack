const Joi = require('joi');

const loginSchema = Joi.object({
    loginId: Joi.string().required(),
    password: Joi.string().required()
});


module.exports = {
    loginSchema: loginSchema
};