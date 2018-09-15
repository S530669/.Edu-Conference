var express = require('express');
var router = express.Router();
var path = require ('path');

router.get('/', function(request, response) {
    response.render('home.ejs');
  });
  
  router.get('/home', function(request, response) {
    response.render('home.ejs');
  }); 
  
  router.get('/attendee', function(request, response) {
    response.render('attendee.ejs');
  });
  
  router.get("/presenter", function(request, response) {
    response.render('presenter.ejs');
  });

  router.get("/Graduatestudent", function(request, response) {
    response.render('Graduatestudent.ejs');
  });
  
  router.get("/faculty", function(request, response) {
    response.render('faculty.ejs');
  });
  
  router.get("/vendor", function(request, response) {
    response.render('vendor.ejs');
  });
  
  router.get("/cart", function(request, response) {
    response.render('cart.ejs');
  });

  router.get("/contact", function(request, response) {
    response.render('contact.ejs');
  });
//   app.get("/Presentercart", function(request, response) {
//     response.sendFile(__dirname+"/views/Presentercart.html");
//   });
  
//   app.get("/payThroughCards", function(request, response) {
//     response.sendFile(__dirname+"/views/payThroughCards.html");
//   });
  
//   app.get("/paymentthroughcheck", function(request, response) {
//     response.sendFile(__dirname+"/views/paymentthroughcheck.html");
//   });
  
//   app.get("/brickpayment.html", function(request, response) {
//     response.sendFile(__dirname+"/views/brickpayment.html");
//   });
//   app.get("/edupay.html", function(request, response) {
//     response.sendFile(__dirname+"/views/edupay.html");
//   });
//   app.get("/Style", function(request, response) {
//     response.sendFile(__dirname+"/views/Style.css");
//   }); 
  
  module.exports = router;