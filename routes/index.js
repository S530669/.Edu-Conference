var express = require('express');
var router = express.Router();
var path = require ('path');

router.get('/', function(request, response) {
    response.render('homepage.ejs');
  });
  
  router.get('/homepage', function(request, response) {
    response.render('homepage.ejs');
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

  router.get("/couponcode", function(request, response) {
    response.render('couponcode.ejs');
  });
  
  router.get("/Paymentthroughcheck", function(request, response){
    response.render('Paymentthroughcheck.ejs');
  });
  router.get("/PayThroughCards", function(request, response){
    response.render('PayThroughCards.ejs');
  });
  router.get("/edupay", function(request, response){
    response.render('edupay.ejs');
  });

//   // Get Homepage
// router.get('/', ensureAuthenticated, function(req, res){
// 	res.render('index');
// });

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

  module.exports = router;