const Joi = require('joi')

exports.payVal = Joi.object({
    finalprice:Joi.number().required()
    })