const UserModel = require("../models/user")
const bcrypt = require("bcrypt")
const uuid = require("uuid")
const mailService = require("./mail-service")
const tokenService = require("./token-service")
const UserDto = require("../dtos/UserDto")

class UserService {
    registration = async  (email, password) => {
        const candidate = await UserModel.findOne({email})
        if (candidate){
            throw new Error(`Пользователь с email - ${email} уже существует`)
        }

        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()
        const user = await UserModel.create({email, password: hashPassword, activationLink: `http://localhost:3000/api/activate/${activationLink}` })
        await mailService.sendActivationLink(email, `http://localhost:3000/api/activate/${activationLink}`)

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }
}

module.exports = new UserService()