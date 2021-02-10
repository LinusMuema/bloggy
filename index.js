// configure dotenv for environment variables
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// Import the routes modules
const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users');
const blogsRoute = require('./routes/blogs');

// Register the routes
app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/blogs', blogsRoute);

// Start the server
app.listen(process.env.PORT, async () => {
    console.log('server started : 2400')

    //Database config
    const options = { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true }
    await mongoose.connect(process.env.MONGODB_URL, options)
    console.log('connected to DB successfully')
});

// Render the entry point
app.set('view engine', 'pug')
app.get('/', (req, res) => {
    res.render('index')
})

module.exports = app;
