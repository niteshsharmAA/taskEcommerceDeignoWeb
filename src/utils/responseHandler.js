const { default: mongoose } = require("mongoose");
const fs = require("fs");

module.exports = controllerFunction => async (request, response, next) => {
    try {
        const startTime = new Date(); // Capture start time
        request.date = startTime; // Assign start time to request.date
        const { statusCode = 200, ...resObj } = await controllerFunction(request, response, next);
        response.status(+statusCode).json(resObj);
        log("success.log", null, request, resObj, startTime); // Pass startTime to log function
    } catch (error) {
        if (error instanceof mongoose.Error.CastError) {
            response.status(400).json({
                status: false,
                message: "Wrong ID Format",
                data: []
            });
        } else {
            response.status(500).json({
                status: false,
                message: "Internal server error!",
                data: []
            });
        }

        log("error.log", error, request, null, request.date); // Pass request.date to log function
    }
};

function log(filename, error, request, response, startTime) {
    try {
        const endTime = new Date(); // Capture end time
        let msg = `${new Date()}\n${request.method.padEnd(6, " ")} => ${request.url} - ${endTime.getTime() - startTime.getTime()} ms\nuser: ${JSON.stringify(request.user || {})}\nbody: ${JSON.stringify(request.body)}\nquery: ${JSON.stringify(request.query)}\nparams: ${JSON.stringify(request.params)}\n`;
        if (error) msg += `error: ${error.stack}\n\n\n`;
        else msg += `response: ${JSON.stringify(response)}\n\n\n`;
        const folder = `logs/${endTime.getDate().toString().padStart(2, "0")}-${(endTime.getMonth() + 1).toString().padStart(2, "0")}-${endTime.getFullYear()}`;
        if (!fs.existsSync("logs")) fs.mkdirSync('logs');
        if (!fs.existsSync(folder)) fs.mkdirSync(folder);
        fs.appendFileSync(`${folder}/${filename}`, msg);
        // console.log(msg)
    } catch (e) { console.log(e); }
}
