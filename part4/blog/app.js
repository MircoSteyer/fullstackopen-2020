const express = require("express")
const app = express()
const config = require("./utils/config")
/*const middleware = require("./utils/middleware")*/
const cors = require("cors")
const mongoose = require("mongoose")
const blogRouter = require("./controllers/blogController")

mongoose.connect(config.MONGODB_URI, {useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => {console.log("Connected to MongoDB")})
    .catch(error => {console.log("Error: ", error.message)})

app.use(express.json())
app.use(cors())

app.use("/api/blogs", blogRouter)

module.exports = app