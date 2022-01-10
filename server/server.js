const app = require("./app")
require("dotenv").config()

const PORT = process.env.PORT || 5005

const start = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server started on ${PORT} port`)
        })
    } catch (e) {
        console.log(e);
    }
}

start().catch(e => console.log(e))