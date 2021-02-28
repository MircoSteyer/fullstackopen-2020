const config = require("../utils/config")
const express = require("express")
const loginRouter = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/user")

loginRouter.post("/", async (req, res) => {
    const body = req.body
    if (!body.username || !body.password) {
        return res.status(401).json({error: "Username or password missing."})
    }
    const user = await User.findOne({username: body.username})
    if (!user) {
        return res.status(401).json({error: "No user with that username."})
    }
    const correctPassword = await bcrypt.compare(body.password, user.passwordHash)
    if (!correctPassword) {
        return res.status(401).json({error: "Username or password incorrect."})
    }
    const webTokenBody = {
        username: user.username,
        id: user._id
    }
    const token = jwt.sign(webTokenBody, config.JWT_SECRET_KEY)

    res.status(200).send({token: token, username: user.username, name: user.name})
})

module.exports = loginRouter