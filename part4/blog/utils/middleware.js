require("express-async-errors")

const unknownEndpoint = (req, res) => {
    res.status(404).json({error: "Unknown endpoint."})
}

const errorHandler = (error, req, res, next) => {
    switch (error.name) {
    case ("ValidationError"):
        res.status(400).json({error: error.message})
        break
    default:
        next(error)
    }
}

module.exports = {
    unknownEndpoint,
    errorHandler,
}