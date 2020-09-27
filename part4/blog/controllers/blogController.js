const blogRouter = require("express").Router()
const Blog = require("../models/blog")

blogRouter.get("/", async (req, res) => {
    const blogs = await Blog.find({})
    res.json(blogs)
})

blogRouter.post("/", async (req, res) => {
    const body = req.body
    const newBlog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    })
    await newBlog.save()
    res.status(200).json(newBlog)
})

module.exports = blogRouter