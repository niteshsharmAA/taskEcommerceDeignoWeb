const Joi = require('joi')

exports.addressVal = Joi.object({
    address:Joi.string().required(),
    pincode:Joi.string().required().max(6).min(6),
    state:Joi.string().required(),
    country:Joi.string().required()
})