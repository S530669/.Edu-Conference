var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');
var db = mongoose.connection;
router.get('/', function (request, response) {
  db.collection('feedetails').find().toArray(function (err, result) {
    if (err) throw err;
    response.render('homepage.ejs', { list: result });
  })
});

router.get('/homepage', function (request, response) {
  response.render('homepage.ejs');
});

router.get('/attendee', function (request, response) {
  db.collection('addprograms').find().toArray(function (err, result) {
    if (err) throw err;
    console.log(result);
    response.render('attendee.ejs', { list: result });
  })
});
 

router.get("/presenter", function (request, response) {
  db.collection('addprograms').find().toArray(function (err, result) {
    if (err) throw err;
    console.log(result);
    response.render('presenter.ejs', { list: result });
  })
});
 
router.get("/Graduatestudent", function (request, response) {
  db.collection('addprograms').find().toArray(function (err, result) {
    if (err) throw err;
    console.log(result);
    response.render('Graduatestudent.ejs', { list: result });
  })
});
 
router.get("/faculty", function (request, response) {
  db.collection('addprograms').find().toArray(function (err, result) {
    if (err) throw err;
    console.log(result);
    response.render('faculty.ejs', { list: result });
  })
});
router.get("/vendor", function (request, response) {
  response.render('vendor.ejs');
});

router.get("/cart", function (request, response) {
  response.render('cart.ejs');
});

router.get("/travel", function (request, response) {
  response.render('travel.ejs');
});

router.get("/schedule", function (request, response) {
  response.render('schedule.ejs');
});

router.get("/program", function (request, response) {
  response.render('program.ejs');
});

router.get("/deadlines", function (request, response) {
  response.render('deadlines.ejs');
});
router.get("/contact", function (request, response) {
  response.render('contact.ejs');
});

router.get("/Conference", function (request, response) {
  db.collection('deadlines').find().toArray(function (err, result) {
    if (err) throw err;
    db.collection('programdetails').find().toArray(function (err, result1) {
      if (err) throw err;
      response.render('ConferenceInformation.ejs', { list: result, list1: result1 });

    })
  });
});

router.get("/couponcode", function (request, response) {
  response.render('couponcode.ejs');
});

router.get("/Paymentthroughcheck", function (request, response) {
  response.render('Paymentthroughcheck.ejs');
});
router.get("/PayThroughCards", function (request, response) {
  response.render('PayThroughCards.ejs');
});
router.get("/edupay", function (request, response) {
  response.render('edupay.ejs');
});
router.get("/presenterconf", function (request, response) {
  response.render('presenterconf');
});

router.get('/forgotE', function (req, res) {
  res.render('forgotE.ejs');
});


router.get('/admin', ensureAuthenticated, function (req, res) {
  res.render('/');
});



function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    //req.flash('error_msg','You are not logged in');
    res.redirect('/users/login');
  }

  router.get("/adminhomepage", function (request, response) {
    response.render('adminhomepage.ejs');
  });


  router.get("/FeeDetails", function (request, response) {
    db.collection('feedetails').find().toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      response.render('UpdateFeeDetails.ejs', { list: result });
    })
  });

  router.get("/ProgramDetails", function (request, response) {
    db.collection('programdetails').find().toArray(function (err, result) {
      if (err) throw err;
      // console.log(result);
      response.render('UpdateProgramDetails.ejs', { list: result });
    })
  });

  router.get("/Deadline", function (request, response) {

    db.collection('deadlines').find().toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      response.render('UpdateDeadlines.ejs', { list: result });
    })
  });

  router.get('/adminattendee', function (request, response) {
    db.collection('attendees').find().toArray(function (err, result) {
      if (err) throw err;
      // console.log(result);
      response.render('adminattendee.ejs', { list: result });
    })
  });

  router.get('/adminvendor', (request, response, next) => {
    db.collection('vendors').find().toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      response.render('adminvendor.ejs', { list: result });
    })
  })
  router.get('/admincontact', (request, response, next) => {
    db.collection('contacts').find().toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      response.render('admincontact.ejs', { list: result });
    })
  })
  router.get("/Add", function (request, response) {
    db.collection('addprograms').find().toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      response.render('add drop programs.ejs', { list: result });
    })
  });

  router.get("/AdminPresenter", function (request, response) {
    db.collection('presenters').find().toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      response.render('AdminPresenter.ejs', { list: result });

    });
  });
}



// //Attendees count

// router.get("/veg", function(request, response) {
//   var query = {$or: [{"food":"Non veg"}, {"food":"Non Veg"}]}
//   var count1 = db.collection('attendees').find(query).count();
//   count1.then(function(result){
//     response.render('adminattendee.ejs', {veg: result});
//   });
// });

module.exports = router;