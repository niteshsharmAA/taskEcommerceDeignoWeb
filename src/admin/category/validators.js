const Joi = require('joi')

exports.categoryVal = Joi.object({
    name: Joi.string().required(),
    category: Joi.string().optional(),

})