module.exports = (joiSchema, validateOver) => (req, res, next) => {
    if (!validateOver)
    {
        if (req.method === "GET") validateOver = "query";
        else validateOver = "body";
    }
    const check = joiSchema.validate(req[validateOver])
    if (check.error) {
        const message = check.error.message
        res.status(400).json({
            status: false,
            message,
            data: {}
        })
    } else {
        next()
    }
}