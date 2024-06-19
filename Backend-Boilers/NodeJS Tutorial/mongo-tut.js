const express = require('express');
const app = express();

const userModel = require('./database-server.js');
const postModel = require('./postModel.js');

app.get('/', (req, res) => 
{
    res.send('Hey');
});


app.get('/create', async (req, res) => 
{
    let createdUser = await userModel.create({name: 'Johhjn', age: 2565, email: 'rtertg@gmail.com'} )   ;
    res.send(createdUser);
});

app.get('/createpost', async (req, res) =>
{
    let createdPost = await postModel.create({postdata: 'This is a post', likes: 0, user: '5f3e7f3c'});
    const user = await userModel.findOne({_id: '5f3e7f3c'});
    user.posts.push(createdPost._id);
    user.save();
});
app.listen(3000, () => { console.log('Server is running on port 3000') });