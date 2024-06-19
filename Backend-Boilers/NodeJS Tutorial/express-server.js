// "express": "^4.19.2",
// here ^ means major version number 4 will remain same always and minor and patch version can be updated

import express from 'express';
const app = express();
const dotenv = require('dotenv').config();

//here get is a method of express object for REST API functionality. 
//can also use POST, PATCH, DELETE, PUT etc. here first parameter is path and second is callback function 

app.get('/', (req, res) => {
    res.send('Hello World');
  });

app.get('/about', (req, res) => {
    res.send('Hello from about page');
  });

app.listen(process.env.PORT, () => { console.log('Server is running on port 3000') });

//to hide the port number we use .env file which has the port number and we use dotenv package to access the port number from .env file