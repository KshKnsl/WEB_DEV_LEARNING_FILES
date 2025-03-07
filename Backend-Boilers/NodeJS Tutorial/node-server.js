const http = require("http");
const fs = require("fs");
const url = require("url");

const portNo = 4000;//this variable will be used later to specify the post number to be used to start the server

//storing this in a  variable 

const myServer = http.createServer((req,res)=>
{
    if(req.url=='/'){
    res.statusCode=200;//for postman type applinations
    res.setHeader('Content-Type','text/plain');//just a convention
    console.log('new request received');//just a convention
    console.log(url.parse(req.url,true));//printing the current onep url and parsing it using a node module
    //url is a npm module here
    var log = `${Date.now()} ${req.url}:  a log was created\n`;
    //fs stands for file system
    fs.appendFile("log.txt",log,(err,data)=>
    {
        res.end("Hello response from server");// passing a html file to be rendered on the localhost:port page
    });}
    else{
        res.statusCode=404;
        res.end("The page was not found");
    }
});

//server starts in the below line after it is told about the port nuber
myServer.listen(portNo, ()=> console.log("Server started"));