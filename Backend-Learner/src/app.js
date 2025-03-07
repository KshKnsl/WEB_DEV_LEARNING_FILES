const express = require('express');
const app = express();
const dotenv= require('dotenv').config();
const port = 3000;


const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

app.get('/', (req,res) => {
    res.send("Hello world");
});

app.listen(process.env.PORT, () => {console.log("Server is running at port " + process.env.PORT)});