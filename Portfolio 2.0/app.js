const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.get('/', (req, res) =>  
{
    res.render('index');
});

app.get('/contact', (req, res) =>  
    {
        res.render('contact');
    });
app.get('/skills', (req, res) =>  
{
    res.render('skills');
});

app.post('/form', (req, res) =>  
{
    res.send('Thanks for contacting, will get back to you soon');
});
app.listen(3000, () => console.log('Server is running on port 3000'));