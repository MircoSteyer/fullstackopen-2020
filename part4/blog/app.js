require("express-async-errors")
const express = require("express")
const app = express()
const config = require("./utils/config")
const middleware = require("./utils/middleware")
const cors = require("cors")
const mongoose = require("mongoose")
const blogRouter = require("./controllers/blogController")
const userRouter = require("./controllers/userController")
const loginRouter = require("./controllers/loginController")
const morgan = require("morgan")


mongoose.connect(config.MONGODB_URI, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true})
    .then(() => {console.log("Connected to MongoDB")})
    .catch(error => {console.log("Error: ", error.message)})

app.use(middleware.tokenExtractor)
app.use(express.json())
app.use(cors())
if (process.env.NODE_ENV !== "test") {
    app.use(morgan("dev"))
}

app.get("/", (req, res) => {
    res.send("<h1>Hello World</h1>")
})

app.use("/api/blogs", blogRouter)
app.use("/api/users", userRouter)
app.use("/api/login", loginRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
module.exports = app