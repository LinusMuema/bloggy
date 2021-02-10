const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: String,
    author: String,
    content: String,
    comments: [],
    likes: []
});

const blog = mongoose.model("Blog", schema);
module.exports = blog;

