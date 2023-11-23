const { default: mongoose } = require("mongoose");
const { DATE_FORMAT } = require("../config/constant");

module.exports = controllerFunction => async (request, response, next) => {
    try {
        response.locals.message = request.flash();
        const { statusCode = 200, page, data, redirect, flash } = await controllerFunction(request, response, next)
        if (flash) 
        {
            request.flash(...flash);
        }
        if (redirect) 
        {
            if (redirect === 'back') return response.redirect(redirect)
            return response.redirect(`${process.env.ADMIN_PREFIX}${redirect}`)
        };
        response.status(+statusCode).render(page, { ADMIN_PREFIX: process.env.ADMIN_PREFIX, admin: request.session.user, DATE_FORMAT, ...data })
        // console.log(`${request.method.padEnd(6, " ")} => ${request.url} - ${new Date().getTime() - request.date.getTime()} ms\nbody: ${JSON.stringify(request.body)}\nresponse: ${JSON.stringify(data)}`)
    } catch (error) {
        console.log(`${request.method.padEnd(6, " ")} => ${request.url} - ${new Date().getTime() - request.date.getTime()} ms\nbody: ${JSON.stringify(request.body)}\nerror: ${error.stack}`)
        response.status(500).render('error/error',{message:"Internal server error!"})
    }
}