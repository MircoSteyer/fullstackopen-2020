const blogRouter = require("express").Router()
const Blog = require("../models/blog")

blogRouter.get("/", (req, res) => {
    Blog.find({}).then(allBlogs => res.json(allBlogs))
})

blogRouter.post("/", (req, res, next) => {
    Blog.create(req.body)
        .then(newBlogEntry => res.status(201).json(newBlogEntry))
        .catch(e => next(e.message))
})

module.exports = blogRouter