const jwt = require("jsonwebtoken")
const TokenModel = require("../models/token")

class TokenService {
    generateTokens = (payload) => {
        const userToken = jwt.sign(payload, process.env.SECRET_USER_TOKEN, {expiresIn: "30m"})
        const refreshToken = jwt.sign(payload, process.env.SECRET_REFRESH_TOKEN, {expiresIn: "30m"})
        return {
            userToken,
            refreshToken
        }
    }

    saveToken = async (userID, refreshToken) => {
        const tokenData = await TokenModel.findOne({user: userID})
        if(tokenData){
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = await TokenModel.create({user: userID, refreshToken})
        return token.save()
    }
}

module.exports = new TokenService()