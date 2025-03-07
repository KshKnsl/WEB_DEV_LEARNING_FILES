const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/learn");

const Schema = mongoose.Schema(
    {
        name: String,
        email: String,
        password: String,
        age: Number
    }
);

const usermodel = mongoose.model('user', Schema);
module.exports = usermodel;