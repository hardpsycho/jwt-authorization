const UserService = require("../services/user-service")
const {validationResult} = require("express-validator");
const ApiError = require("../exceptions/apiErrors")

class UserController {
    registration = async (req, res, next) => {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(ApiError.badRequest("Ошибка валидации данных", errors.array()))
            }
            const {email, password} = req.body
            const userData = await UserService.registration(email, password)
            res.cookie("refreshToken", userData.refreshToken, {httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000})
            return res.json(userData)
        } catch (e) {
            next(e);
        }
    }

    login = async (req, res, next) => {
        try {
            const {email, password} = req.body
            const userData = await UserService.login(email, password)
            res.cookie("refreshToken", userData.refreshToken, {httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000})
            return res.json(userData)

        } catch (e) {
            next(e);
        }
    }

    logout = async (req, res, next) => {
        try {
            const {refreshToken} = req.cookies
            const token = await UserService.logout(refreshToken)
            res.clearCookie("refreshToken")
            return res.json({token})
        } catch (e) {
            next(e);
        }
    }

    activate = async (req, res, next) => {
        try {
            const activationLink = req.params.link
            console.log(activationLink);
            await UserService.activate(activationLink)
            return res.redirect(process.env.CLIENT_URL)
        } catch (e) {
            next(e);
        }
    }

    refresh = async (req, res, next) => {
        try {
            const {refreshToken} = req.cookies
            const userData = await UserService.refresh(refreshToken)
            res.cookie("refreshToken", userData.refreshToken, {httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000})
            return res.json({userData})
        } catch (e) {
            next(e);
        }
    }

    getUsers = async (req, res, next) => {
        try {
            res.json("test")
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new UserController()