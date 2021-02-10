const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.generateAccessToken = async (id) => jwt.sign(id, process.env.TOKEN_SECRET)

exports.hashPassword = async (password) => {
    const rounds = Math.floor(Math.random() * 10) + 1
    return bcrypt.hash(password, rounds)
}
