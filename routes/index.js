var express = require('express');
var router = express.Router();
var path = require ('path');
var mongoose = require('mongoose');
var db = mongoose.connection;
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

router.get('/admin', ensureAuthenticated,  function(req, res){ 
	res.render('/');
});


function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
  }

  router.get("/adminhomepage", function(request, response) {
    response.render('adminhomepage.ejs');
    });
    router.get("/Deadlines", function(request, response) {
      response.render('UpdateDeadlines.ejs');
      });
      router.get("/FeeDetails", function(request, response) {
        response.render('UpdateFeeDetails.ejs');
        });
        router.get("/ProgramDetails", function(request, response) {
          response.render('UpdateProgramDetails.ejs');
          });

          
    router.get('/adminattendee', function(request, response){ 
      db.collection('attendees').find().toArray(function(err,result){
        if (err) throw err;
        console.log(result);
        response.render('adminattendee.ejs',{list : result});
      })
      });

     router.get('/adminvendor', (request, response, next) => {
    db.collection('vendors').find().toArray(function(err,result){
        if (err) throw err;
        console.log(result);
        response.render('adminvendor.ejs',{list : result});
      })
      })

router.get("/AdminPresenter", function(request, response) {
  db.collection('presenters').find().toArray(function(err,result){
    if (err) throw err;
    console.log(result);
    response.render('AdminPresenter.ejs',{list : result});
  
});
});
}



//Attendees count

router.get("/veg", function(request, response) {
  var query = {$or: [{"food":"Non veg"}, {"food":"Non Veg"}]}
  var count1 = db.collection('attendees').find(query).count();
  count1.then(function(result){
    response.render('adminattendee.ejs', {veg: result});
  });
});

  module.exports = router;