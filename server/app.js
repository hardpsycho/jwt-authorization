require("dotenv").config()
const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const router = require("./router/Router")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use("/api", router)

module.exports = app