const blogRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")

blogRouter.get("/", async (req, res) => {
    const blogs = await Blog.find({}).populate("user", {blogs: 0})
    res.json(blogs)
})

blogRouter.post("/", async (req, res) => {
    const body = req.body
    const newBlog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: body.user
    })
    await newBlog.save()
    const user = await User.findById(body.user)
    user.blogs = user.blogs.concat(newBlog._id)
    await user.save()
    res.status(200).json(newBlog)
})

blogRouter.delete("/:id", async (req, res) => {
    const oldBlog = await Blog.findById(req.params.id)
    if (oldBlog === null) {
        return res.status(400).json({error: "Could not find requested ID."})
    }
    const user = await User.findById(oldBlog.user)
    user.blogs = user.blogs.filter(blog => blog.toString() !== oldBlog._id.toString())
    await user.save()
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
})

blogRouter.put("/:id", async (req, res) => {
    const oldBlog = await Blog.findById(req.params.id)
    if (oldBlog.user.toString() !== req.body.user) {
        return res.status(400).json({error: "Only changes to the blog content are allowed, not to associated the user."})
    }
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {new: true, useFindAndModify: false})
    updatedBlog !== null ? res.status(200).send(updatedBlog) : res.status(404).send({error: "Could not find id."})
})

module.exports = blogRouter