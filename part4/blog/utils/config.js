require("dotenv").config()
const PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

if (process.env.NODE_ENV === "test") {
    MONGODB_URI = process.env.TEST_MONGODB_URI
}

module.exports = {
    PORT,
    MONGODB_URI,
    JWT_SECRET_KEY
}