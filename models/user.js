const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    email: String,
    password: String,
    followers: []
});

const user = mongoose.model("User", schema);
module.exports = user;
