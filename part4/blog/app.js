require("express-async-errors")
const express = require("express")
const app = express()
const config = require("./utils/config")
const middleware = require("./utils/middleware")
const cors = require("cors")
const mongoose = require("mongoose")
const blogRouter = require("./controllers/blogController")
const morgan = require("morgan")


mongoose.connect(config.MONGODB_URI, {useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => {console.log("Connected to MongoDB")})
    .catch(error => {console.log("Error: ", error.message)})

app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

app.get("/", (req, res) => {
    res.send("<h1>Hello World</h1>")
})

app.use("/api/blogs", blogRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
module.exports = app