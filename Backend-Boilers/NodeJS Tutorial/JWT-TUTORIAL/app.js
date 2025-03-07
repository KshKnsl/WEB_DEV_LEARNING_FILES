const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const usermodel = require('./models/user');

app.use(cookieParser());
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => 
    {
        res.render('index');
    }
);

app.post('/create', async (req, res) => 
{
    bcrypt.genSalt(10, async (err, salt) => 
    {
        bcrypt.hash(req.body.password, salt, async (err, hash) => 
        {
            const newUser = await usermodel.create(
            {
                name: req.body.username,
                email: req.body.email,
                password: hash,
                age: req.body.age
            });
        });
    });
    let email = req.body.email;
    let token = jwt.sign({ email }, 'secretkey');
    res.cookie('token', token);
});


app.get('/login', (req, res) => 
    {
        if(req.cookies.token !=  '' )
            res.send("You are already logged in");
        else 
            res.render('login');
    }
);
app.post('/login', async (req, res) => 
    {
        let username = req.body.username;
        let password = req.body.password;
        const user = await usermodel.findOne({ name: username });
        if(user)
        {
            bcrypt.compare(password, user.password, (err, result) => 
            {
                if(result)
                {
                    res.cookie('token', jwt.sign({ email: user.email }, 'secret_key'));
                    res.send("Login Successful");
                }
                else
                    res.send("Invalid username or password");
            });
        }
        else     res.send("Invalid username or password");
    }
);

app.get('/logout', (req, res) => 
    {
        res.cookie("token", "");
        res.redirect('/');
    }
);

app.listen(3000, () => { console.log(`Server is running on port 3000`); });