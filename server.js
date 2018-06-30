var express = require('express')
var http = require('http')
var path = require('path')
let https = require('https');

const app = express()


app.set( 'port', ( process.env.PORT || 5000 ));

app.set('views', path.join(__dirname, '/views'))


const routes = require('./controllers')
app.use('/', routes) 

// Start node server
app.listen( app.get( 'port' ), function() {
    console.log( 'Node server is running on port ' + app.get( 'port' ));
    });