const ApiErrors = require("../exceptions/apiErrors")
const TokenService = require("../services/token-service")

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]
        console.log(`токен из хеадера - ${token}`)
        if(!token){
            return next(ApiErrors.unauthorizedError())
        }

        const userData = TokenService.validateAccessToken(token)
        console.log(userData)
        if(!userData){
            console.log("промис проверка")
            return next(ApiErrors.unauthorizedError())
        }

        req.user = userData
        next()
    } catch (e) {
        return next(ApiErrors.unauthorizedError())
    }
}