import joi from "joi";

 export const userValidation = joi.object({
    first_name : joi.string().required().min(3).max(25),
    last_name  : joi.string().required().min(3).max(25),
    email      : joi.string().required(),
    password   : joi.string(),
    role       : joi.string().valid('admin', 'moderator'),
    phone      : joi.number(),
    address    : joi.string().min(5).max(50),
});

 export const loginValidation = joi.object({
    email      : joi.string().required(),
    password   : joi.required(),
 })