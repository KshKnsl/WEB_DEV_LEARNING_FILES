const express = require('express');
const app = express();

app.use((req, res, next) => {
    console.log('Hello from the middleware');
    next();
}); 

//frontend se milna vala unreadable data ko backend me readable convert karne ke liye
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//setup ejs as a middleware view engl=ine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.send('i run after middleware');
});

app.listen(3000, () => { console.log('Server is running on port 3000') });