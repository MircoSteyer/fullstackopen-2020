const express = require("express")
const userRouter = express.Router()
const bcrypt = require("bcrypt")
const User = require("../models/user")
const Blog = require("../models/blog")

userRouter.get("/", async (req, res) => {
    const allUsers = await User.find({}).populate("blogs", {user: 0})
    res.status(200).json(allUsers)
})

userRouter.post("/", async (req, res) => {
    const body = req.body
    const saltRounds = 10
    if (!body.password) {
        return res.status(400).json({error: "Password is required."})
    }
    if (body.password.length < 3) {
        return res.status(400).json({error: "Password must be at least 3 characters long."})
    }
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const newUser = new User({
        username: body.username,
        name: body.name,
        passwordHash,
        blogs: body.blogs || []
    })
    await newUser.save()
    res.status(200).json(newUser)
})

userRouter.delete("/:id", async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user === null) {
        return res.status(400).json({error: "Could not find requested ID."})
    }
    for (const blogId of user.blogs) {
        await Blog.findByIdAndDelete(blogId)
    }
    await User.findByIdAndDelete(req.params.id)
    res.status(204).end()
})

module.exports = userRouter