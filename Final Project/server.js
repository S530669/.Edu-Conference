var path = require("path")
var express = require("express")
var logger = require("morgan")
var bodyParser = require("body-parser") 
var app = express()   
var nodemailer = require('nodemailer');

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

//mail


app.post("/mail",function(request,response){
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'gdp2.fastrack@gmail.com',
    pass: 'gdp21234'
  }
});

var mailOptions = {
  from: 'gdp2.fastrack@gmail.com',
  to: request.body.email,
  subject: 'Coupon code for code regestration',
  html: '<p>Hello,</p><p>Here is the coupon code that you need enter.</p><p>Thanks&Regards</p><p>.edu team</p> ',
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
    response.sendFile(path.join(__dirname,'/views','couponcode.html'));
  }
});
});

app.set('port',(process.env.PORT || 8083));

app.listen(app.get('port'), function () {
  console.log('App listening on http://127.0.0.1:8083/') 
})






