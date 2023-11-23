const Joi = require('joi')

exports.registerVal = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),

})

exports.loginVal=Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})