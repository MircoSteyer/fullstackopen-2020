const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required."],
        unique: true,
        minlength: 3
    },
    name: {
        type: String,
        required: [true, "Name is required."],
    },
    passwordHash: {
        type: String,
        required: [true, "Password is required."]
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog"
        }
    ]
}, {
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id.toString()
            delete ret._id
            delete ret.__v
            delete ret.passwordHash
        }
    }
})

mongoose.plugin(uniqueValidator)

module.exports = mongoose.model("User", userSchema)