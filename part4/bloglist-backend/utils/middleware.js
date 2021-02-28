require("express-async-errors")
const jwt = require("jsonwebtoken")
const config = require("./config")

const unknownEndpoint = (req, res) => {
    res.status(404).json({error: "Unknown endpoint."})
}

const errorHandler = (error, req, res, next) => {
    switch (error.name) {
    case ("ValidationError"):
        res.status(400).json({error: error.message})
        break
    case ("JsonWebTokenError"):
        res.status(400).json({error: error.message})
        break
    case ("TypeError"):
        res.status(400).json({error: error.message})
        break
    default:
        next(error)
    }
}

const tokenExtractor = (req, res, next) => {
    if (req.headers.authorization) {
        const authorization = req.headers.authorization.split((" "))

        if (!(authorization[0].toLowerCase() === "bearer")) {
            return res.status(401).json({error: "Authentication not successful."})
        }
        const token = jwt.verify(authorization[1], config.JWT_SECRET_KEY)
        req.token = token
    }
    next()
}

module.exports = {
    unknownEndpoint,
    errorHandler,
    tokenExtractor
}