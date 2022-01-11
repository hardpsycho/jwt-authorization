const UserService = require("../services/user-service")

class UserController {
    registration = async (req, res, next) => {
        try {
            const {email, password} = req.body
            const userData = await UserService.registration(email, password)
            res.cookie("refreshToken", userData.refreshToken, {httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000})
            return res.json(userData)
        } catch (e) {
            console.log(e);
        }
    }

    login = async (req, res, next) => {
        try {

        } catch (e) {

        }
    }

    logout = async (req, res, next) => {
        try {

        } catch (e) {

        }
    }

    activate = async (req, res, next) => {
        try {

        } catch (e) {

        }
    }

    refresh = async (req, res, next) => {
        try {

        } catch (e) {

        }
    }

    getUsers = async (req, res, next) => {
        try {
            res.json("test")
        } catch (e) {

        }
    }
}

module.exports = new UserController()