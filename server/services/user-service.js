const UserModel = require("../models/user")
const bcrypt = require("bcrypt")
const uuid = require("uuid")
const mailService = require("./mail-service")
const tokenService = require("./token-service")
const UserDto = require("../dtos/UserDto")
const ApiError = require("../exceptions/apiErrors")

class UserService {
    registration = async  (email, password) => {
        const candidate = await UserModel.findOne({email})
        if (candidate){
            throw ApiError.badRequest(`Пользователь с email - ${email} уже существует`)
        }

        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()
        const user = await UserModel.create({email, password: hashPassword, activationLink })
        await mailService.sendActivationLink(email, `${process.env.API_URL}/api/activate/${activationLink}`)

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    activate = async (activationLink) => {
        const user = await UserModel.findOne({activationLink})
        if(!user){
            throw ApiError.badRequest("Неверная ссылка активации")
        }
        user.activated = true
        user.save()
    }

    login = async  (email, password) => {
        const user = await UserModel.findOne({email})
        if (!user){
            throw ApiError.badRequest(`Пользователь не найден`)
        }

        const isPasswordsEquals = await bcrypt.compare(password, user.password)
        if(!isPasswordsEquals){
            throw ApiError.badRequest(`Пароль не верен`)
        }

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})

        return {
            ...tokens,
            user: userDto
        }
    }
}

module.exports = new UserService()