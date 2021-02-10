const jwt = require('jsonwebtoken');

exports.generateAccessToken = async (id) => jwt.sign(id, process.env.TOKEN_SECRET)
