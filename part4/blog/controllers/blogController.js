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
        likes: body.likes || 0,
    })
    await newBlog.save()
    res.status(200).json(newBlog)
})

blogRouter.delete("/:id", async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()

})

blogRouter.put("/:id", async (req, res) => {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {new: true, useFindAndModify: false})
    updatedBlog !== null ? res.status(200).send(updatedBlog) : res.status(404).send({error: "Could not find id."})
})

module.exports = blogRouter