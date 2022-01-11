const ApiErrors = require("../exceptions/apiErrors")

module.exports = (err, req, res, next) => {
    if (err instanceof ApiErrors) {
        return res.status(err.status).json({message: err.message, errors: err.errors})
    }
    return res.status(500).json({message: "Произошла непредвиденная ошибка"})
}