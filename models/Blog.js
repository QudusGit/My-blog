const mongoose = require ("mongoose");
const User = require("./User");

// Create blog Schema
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    body: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: User,
        required: true
    }
}, {timestamps: true})

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;