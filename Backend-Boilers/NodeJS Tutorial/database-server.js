//model create karna se collection create hota hai
//collection me document hota hai
//document me field hota hai
//field me value hota hai
//value me data hota hai
//data me json hota hai
const mongoose = require('mongoose');
//mongo db server helps node server to cummunicate to the database server and perform operations on the database
mongoose.connect('mongodb://localhost:27017/leatgrning'); 
//this creates a database named learning in mongodb

//creating a schema -- declaring structure of the document
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }]
    //this will specify that the posts field will contain arrayt of object id (_id) of the posts
});

//creating a model -- creating a collection
module.exports = mongoose.model('User', userSchema);
//this will create a collection named users(in plural form) in the database learning
//the export word is to make code available for other files













