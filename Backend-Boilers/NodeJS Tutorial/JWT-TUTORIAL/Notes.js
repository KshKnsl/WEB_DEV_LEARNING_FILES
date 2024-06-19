const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
app.use(cookieParser());


app.get('/', (req, res) => 
    {
        res.cookie('name','value');//set cookie name and value
        res.send('Cookie is set');
    }
);

app.get('/read', (req, res) => 
    {
        res.send(req.cookies.name);
        console.log(req.cookies.jwt);
    }
);

app.get("/jwt", function(req,res)
{
    const token = jwt.sign({name: "John", email: "john@example.com"}, "secret_key");
    console.log(token);
    
    res.cookie("jwt", token);
    res.send("JWT token is set as cookie");
});

app.listen(3000, () => { console.log(`Server is running on port 3000`); });