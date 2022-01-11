const UserService = require("../services/user-service")

class UserController {
    registration = async (req, res, next) => {
        try {
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

        } catch (e) {
            next(e);
        }
    }

    logout = async (req, res, next) => {
        try {

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