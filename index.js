// configure dotenv for environment variables
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.listen(process.env.PORT, async () => {
    console.log('server started : 2400')

    //Database config
    const options = { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true }
    await mongoose.connect(process.env.MONGODB_URL, options)
    console.log('connected to DB successfully')
});
