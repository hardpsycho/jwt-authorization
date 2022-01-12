const jwt = require("jsonwebtoken")
const TokenModel = require("../models/token")

class TokenService {
    generateTokens = (payload) => {
        const userToken = jwt.sign(payload, process.env.SECRET_USER_TOKEN, {expiresIn: "10m"})
        const refreshToken = jwt.sign(payload, process.env.SECRET_REFRESH_TOKEN, {expiresIn: "20d"})
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

    removeToken = async (refreshToken) => {
        console.log(refreshToken);
        const token = await TokenModel.deleteOne({refreshToken})
        return token
    }

    validateAccessToken = (token) => {
        try {
            const userData = jwt.verify(token, process.env.SECRET_USER_TOKEN)
            return userData
        } catch (e) {
            return null
        }
    }

    validateRefreshToken = (token) => {
        try {
            const userData = jwt.verify(token, process.env.SECRET_REFRESH_TOKEN)
            return userData
        } catch (e) {
            return null
        }
    }

    findToken = async (refreshToken) => {
        try {
            const userData = await TokenModel.findOne({refreshToken})
            return userData
        } catch (e) {
            return null
        }
    }
}

module.exports = new TokenService()