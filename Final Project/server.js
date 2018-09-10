var path = require("path")
var express = require("express")
var logger = require("morgan")
var bodyParser = require("body-parser") 
var app = express()   
var nodemailer = require('nodemailer');
var couponCode = require('coupon-code');
var Promise = require('bluebird');

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

app.get("/Paymentthroughcheck", function(request, response) {
  response.sendFile(__dirname+"/views/Paymentthroughcheck.html");
});

//mail

var cd=couponCode.generate();
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
  subject: 'Coupon code for code registration',
  html: "Hello,<br>" + "Your coupon code is: " + cd +"<br>Thanks & Regards <br>" + ".EDU Conference" 
  // html: '<a href="http://127.0.0.1:8083/check">click here</a>'
  
  
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


var count = 0;
// this is code that checks uniqueness and returns a promise
function check(cd) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      count++;
      // first resolve with false, on second try resolve with true
      if (count === 1) {
        console.log(cd + ' is not unique');
        resolve(false);
      } else {
        console.log(cd + ' is unique');
        resolve(true);
      }
    }, 1000);
  });
}

var generateUniqueCode = Promise.method(function() {
  // var code = couponCode.generate();
  return check(cd)
    .then(function(result) {
      if (result) {
        return cd;
      } else {
        return generateUniqueCode();
      }
    });
});

generateUniqueCode().then(function(cd) {
  console.log(cd);
});



