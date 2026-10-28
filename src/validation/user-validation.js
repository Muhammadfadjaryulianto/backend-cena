import Joi from "joi";

const registerUserValidation = Joi.object({
    email: Joi.string().email().max(200).required(),
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).required(),
    name: Joi.string().max(100).required()
});

const loginUserValidation = Joi.object({
    email: Joi.string().email().max(200),
    username: Joi.string().max(100),
    password: Joi.string().max(100).required(),
}).xor('email', 'username').messages({
    'object.missing': 'Either email or username is required',
    'object.xor': 'Please provide either email or username, not both'
});

const getUserValidation = Joi.string().max(100).required();

const updateUserValidation = Joi.object({
    id: Joi.string().max(36).required(),
    username: Joi.string().max(100).optional(),
    password: Joi.string().max(100).optional(),
    email: Joi.string().max(200).optional(),
    name: Joi.string().max(100).optional(),
})

export {
    registerUserValidation,
    loginUserValidation,
    getUserValidation,
    updateUserValidation
}