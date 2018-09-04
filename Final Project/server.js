var path = require("path")
var express = require("express")
var logger = require("morgan")
var bodyParser = require("body-parser") 
var app = express() 
var http = require('http').Server(app)  


//app.set("view engine", "html");
//app.set("views", "./views");

app.set("views", path.resolve(__dirname, "views")) 
app.set('view engine', 'html') 
   
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.get("/", function(request, response) {
  response.sendFile(__dirname+"/views/home.html");
});

app.get("/home", function(request, response) {
  response.sendFile(__dirname+"/views/home.html");
}); 

app.get("/attendee", function(request, response) {
  response.sendFile(__dirname+"/views/attendee.html");
});

app.post("/attendee/cart", function(request, response) {
  response.sendFile(__dirname+"/views/cart.html");
});

app.get("/presenter", function(request, response) {
  response.sendFile(__dirname+"/views/presenter.html");
});

app.get("/faculty", function(request, response) {
  response.sendFile(__dirname+"/views/faculty.html");
});

app.get("/vendor", function(request, response) {
  response.sendFile(__dirname+"/views/faculty.html");
});




http.listen(8082, function () {
  console.log('Registration listening on http://127.0.0.1:8082/') 
})






