const blogRouter = require("express").Router()
const Blog = require("../models/blog")

blogRouter.get("/", async (req, res, next) => {
    try {
        const blogs = await Blog.find({})
        res.json(blogs)
    } catch (e) {
        next(e)
    }
})

blogRouter.post("/", async (req, res, next) => {
    try {
        const newBlog = await Blog.create(req.body)
        res.status(201).json(newBlog)
    } catch (e) {
        next(e)
    }
})

module.exports = blogRouter