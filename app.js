var path = require('path');
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser'); 
var app = express();   
var nodemailer = require('nodemailer');
var couponCode = require('coupon-code');
var Promise = require('bluebird');
var mongoose = require('mongoose');

var routes = require('./routes/index');

mongoose.connect('mongodb://localhost:27017/conference');
var Attendee = require('./models/attendee.js');
var Presenter = require('./models/presenter.js');
var Graduatestudent = require('./models/Graduatestudent.js');
var faculty = require('./models/faculty.js');


app.set("views", path.resolve(__dirname, "views")) 
app.set('view engine', 'html') 

var code = couponCode.generate();
var count = 0;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use('/', routes);
app.use(express.static(path.join(__dirname, 'Assets')));

app.post("/attendee", (req, res) => {
  var myData1 = new Attendee(req.body);
  myData1.save()
  .then(item => {
    res.send("Items saved successfully");
})
.catch(err => {
  res.status(400).send("unable to save to database");
  });
});

app.post("/presenter", (req, res) => {
  var myData = new Presenter(req.body);
  myData.save()
  .then(item => {
    res.send("Items saved successfully");
})
.catch(err => {
  res.status(400).send("unable to save to database");
  });
});
app.post("/faculty", (req, res) => {
  
  var myData = new faculty(req.body);
  myData.save()
  .then(item => {
    res.render('couponcode.ejs',{code1 : code});
   // res.send("Items saved succaxessfully");
})
.catch(err => {
  res.status(400).send("unable to save to database");
  });
});

app.post("/Graduatestudent", (req, res) => {
  var myData = new Graduatestudent(req.body);
  myData.save()
  .then(item => {
    res.send("Items saved successfully");
})
.catch(err => {
  res.status(400).send("unable to save to database");
  });
});





// coupon code


// this is code that checks uniqueness and returns a promise
function check(code) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      count++;
      // first resolve with false, on second try resolve with true
      if (count === 1) {
        console.log(code + ' is not unique');
        resolve(false);
      } else {
        console.log(code + ' is unique');
        resolve(true);
      }
    }, 1000);
  });
}

var generateUniqueCode = Promise.method(function() {
  // var code = couponCode.generate();
  return check(code)
    .then(function(result) {
      if (result) {
        return code;
      } else {
        return generateUniqueCode();
      }
    });
});

generateUniqueCode().then(function(code) {
  console.log(code);
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
  html: '<p>Hello,</p><p>Here is the coupon code that you need enter:</p>'+ code +'<p>Thanks&Regards</p><p>.edu team</p> ',
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

app.set('port',(process.env.PORT || 8082));

app.listen(app.get('port'), function () {
  console.log('App listening on http://127.0.0.1:8082/') 
})






