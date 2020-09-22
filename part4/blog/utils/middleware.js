const unknownEndpoint = (req, res, next) => {
    try {
        res.json({error: "Unknown endpoint."})
    } catch (e) {
        next(e)
    }
}

const errorHandler = (error, req, res, next) => {
    switch (error.name) {
    case ("ValidationError"):
        res.json({error: error.message})
        break
    default:
        next(error)
    }
}

module.exports = {
    unknownEndpoint,
    errorHandler,
}