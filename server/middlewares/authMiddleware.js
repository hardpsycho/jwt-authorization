const ApiErrors = require("../exceptions/apiErrors")
const TokenService = require("../services/token-service")

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]
        if(!token){
            return next(ApiErrors.unauthorizedError())
        }

        const userData = TokenService.validateAccessToken(token)
        if(!userData){
            return next(ApiErrors.unauthorizedError())
        }

        req.user = userData
        next()
    } catch (e) {
        return next(ApiErrors.unauthorizedError())
    }
}