const Joi = require('joi')

exports.registerVal = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().max(10).min(10).required(),
    password: Joi.string().required(),

})

exports.loginVal=Joi.object({
    phone: Joi.string().max(10).min(10).required(),
    password: Joi.string().required()
})

exports.generateOTPVal=Joi.object({
    countryCode:Joi.string().required(),
    phone: Joi.string().max(10).min(10).required(),
})

exports.verifyOTPVal=Joi.object({
    countryCode:Joi.string().required(),
    phone: Joi.string().max(10).min(10).required(),
    otp:Joi.number().required()
})

exports.forgotPasswordVal=Joi.object({
    password:Joi.string().required(),
    confirmPassword:Joi.string().required(),
    userId:Joi.string().required()

})
