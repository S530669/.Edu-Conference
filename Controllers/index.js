var express = require('express')
var http = require('http')
var path = require('path')
let https = require('https');
const app = express.Router()
var bodyParser = require('body-parser');

app.use(bodyParser());

app.get('/',(req,res) =>{
    console.log("Get Data");
            res.render('./signup.ejs');
});

app.get('/login',(req,res) =>{
    res.render('./login.ejs');
});

app.get('/signup',(req,res) =>{
    res.render('./signup.ejs');
});


module.exports = app