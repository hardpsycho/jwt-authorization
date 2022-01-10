const {Router} = require("express")
const userController = require("../controllers/UserController")

const router = new Router()

router.post("/registration", userController.registration)
router.post("/login", userController.login)
router.post("/logout", userController.logout)
router.post("/activate/:link", userController.activate)
router.post("/refresh", userController.refresh)
router.post("/users", userController.getUsers)

module.exports = router