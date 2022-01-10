const app = require("./app")
const mongoose = require("mongoose")
require("dotenv").config()

const PORT = process.env.PORT || 5005

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        app.listen(PORT, () => {
            console.log(`Server started on ${PORT} port`)
        })
    } catch (e) {
        console.log(e);
    }
}

start().catch(e => console.log(e))