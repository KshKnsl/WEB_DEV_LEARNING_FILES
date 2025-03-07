const express = require('express');
const app = express();
const path = require('path');
app.use((req, res, next) => {
    console.log('Hello from the middleware');
    next();
}); 

//frontend se milna vala unreadable data ko backend me readable convert karne ke liye
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public'))); //hamesha static files search karna ke liya public folder me hi jana padega
// you can also use this instead of above line app.use(express.static(__dirname+'/public'));
//setup ejs as a middleware view engine
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    //res.send('i run after middleware'); 
    //instead use res.render() to render the ejs file
    res.render('view.ejs');
});

app.get('/user/:username', function(req,res)
{
    console.log(req.params.username);
    res.render(`${req.params.username}.ejs`);
});
app.listen(3000, () => { console.log('Server is running on port 3000') });