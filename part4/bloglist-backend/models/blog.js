const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required."],
    },
    author: {
        type: String,
        required: [true, "Author is required."]
    },
    url: {
        type: String,
        required: [true, "URL is required."]
    },
    likes: {
        type: Number,
        required: [true, "Number of likes are required."]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required."]
    }
}, {
    "toJSON": {
        transform: (doc, ret) => {
            ret.id = ret._id.toString()
            delete ret._id
            delete ret.__v
        }
    }
})

module.exports = mongoose.model("Blog", blogSchema)