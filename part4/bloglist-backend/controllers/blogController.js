const blogRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")

blogRouter.get("/", async (req, res) => {
    const blogs = await Blog.find({}).populate("user", {blogs: 0})
    res.json(blogs)
})

blogRouter.post("/", async (req, res) => {
    if (!req.token) {
        return res.status(401).json({error: "You need to be authorized to post blogs."})
    }

    const body = req.body
    const token = req.token

    const newBlog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        // for user we use his id for verification
        user: token.id
    })
    const user = await User.findById(token.id)
    user.blogs = user.blogs.concat(newBlog._id)
    await newBlog.save()
    await user.save()
    res.status(200).json(newBlog)
})

blogRouter.delete("/:id", async (req, res) => {
    if (!req.token) {
        return res.status(401).json({error: "You need to be authorized to delete blogs."})
    }
    // we try to find the bloglist-backend that should be deleted and find the associated user for it.
    // the list of the users blogs is then filtered, to remove the bloglist-backend from the list
    //we save the user after deleting the block. if the bloglist-backend deletion throws an error, the new bloglist-backend-list for the user is never saved
    const oldBlog = await Blog.findById(req.params.id)

    if (oldBlog === null) {
        return res.status(400).json({error: "Could not find requested ID."})
    }
    if (oldBlog.user.toString() !== req.token.id) {
        return res.status(401).json({error: "User requesting the deletion and creator of bloglist-backend post are not the same person."})
    }
    const user = await User.findById(oldBlog.user)

    user.blogs = user.blogs.filter(blog => blog.toString() !== oldBlog._id.toString())
    await Blog.findByIdAndDelete(req.params.id)
    await user.save()
    res.status(204).end()
})

blogRouter.put("/:id", async (req, res) => {
    req.body.user = req.body.user.id
    console.log("request token", req.token)
    if (!req.token) {
        return res.status(401).json({error: "You need to be authorized to change bloglist-backend information."})
    }
    const oldBlog = await Blog.findById(req.params.id)
    if (oldBlog === null) {
        return res.status(400).json({error: "Could not find requested ID."})
    }
    /*    if (oldBlog.user.toString() !== req.token.id) {
            return res.status(401).json({error: "User requesting the deletion and creator of bloglist-backend post are not the same person."})
        }*/
    if (req.body.user && (oldBlog.user.toString() !== req.body.user)) {
        console.log("request.body", req.body)
        console.log("req.body.user", req.body.user)
        console.log("oldblog.user.tosTring", oldBlog.user.toString())
        return res.status(400).json({error: "Only changes to the bloglist-backend content are allowed, not to associated the user."})
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, {...req.body}, {new: true, useFindAndModify: false})
    updatedBlog !== null ? res.status(200).send(updatedBlog) : res.status(404).send({error: "Could not find id."})
})

module.exports = blogRouter
