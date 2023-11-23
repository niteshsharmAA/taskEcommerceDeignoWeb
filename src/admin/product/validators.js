const Joi = require('joi')

exports.productVal = Joi.object({
    productName: Joi.string().required(),
    category: Joi.string().required(),
    image:Joi.string().required(),
    price:Joi.string().required()

})