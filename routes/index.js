var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');
var db = mongoose.connection;

router.get('/', function (request, response) {
  db.collection('feedetails').find().toArray(function (err, result) {
    db.collection('names').find().toArray(function (err, result1) {
    if (err) throw err;
    response.render('homepage.ejs', { list: result, list1: result1});
    })
  })
});

router.get('/homepage', function (request, response) {
  db.collection('feedetails').find().toArray(function (err, result) {
    db.collection('names').find().toArray(function (err, result1) {
    if (err) throw err;
    response.render('homepage.ejs', { list: result, list1: result1});
    })
  })
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

router.get("/Paymentthroughcheck/:id", function (request, response) {
  var email = String(request.params.id)
  var quantity = request.body.quantity  
  var amount = request.body.quantity
  console.log("Amount"+amount);
//var email1 = db.collection('ca').find({'email':request.body.email})
  db.collection('attendees').find({'email':email}).toArray(function (err, result) {
    //console.log(result)
    if (err) throw err;    
    response.render('Paymentthroughcheck.ejs', { list: result });
  })
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
  res.render('forgotE');
});

router.get("/travel", function (request, response) {
  response.render('travel.ejs');
});

router.get('/admin', ensureAuthenticated, function (req, res) {
  res.redirect('/users/login');
});



function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
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

  router.get("/conferencename", function (request, response) {
    db.collection('names').find().toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      response.render('conferencename.ejs', { list: result });

    });
  });

  //Update Prices
  router.get("/amount", function (request, response) {
    db.collection('amounts').find().toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      response.render('amount.ejs', { list: result });
    })
  });



//Participants Food count

router.get("/foodcount", function(request, response) {
  var regular = db.collection('attendees').find({'food':'Regular'}).count()
  var veg = db.collection('attendees').find({'food':'Vegetarian'}).count()
  var gluten = db.collection('attendees').find({'food':'Gluten Free'}).count()
  var regularp = db.collection('presenters').find({'food':'Regular'}).count()
  var vegp = db.collection('presenters').find({'food':'Vegetarian'}).count()
  var glutenp = db.collection('presenters').find({'food':'Gluten Free'}).count()
  regular.then(function(result){
    veg.then(function(result1){
      gluten.then(function(result2){
        regularp.then(function(resultp){
          vegp.then(function(result1p){
            glutenp.then(function(result2p){
              response.render('foodcount.ejs',{regular: result, veg: result1, gluten: result2, regularp: resultp, vegp: result1p, glutenp: result2p })
            })
          })
         })
      })
    })
   })
 
});

//Delete Database

router.get("/deletedatabase", function (request, response) {
response.render('deletedatabase.ejs')
});

router.post('/cleardb', function (request, response) {
  mongoose.connect('mongodb://localhost/conference');
  
  mongoose.connection.db.dropDatabase(function (err) {
    console.log('db dropped');
    response.redirect('/users/login');
  });

})

router.get('/view', function (req, res) {
  Attendee.find({}, function (err, docs) {
    if (err) res.json(err);
    else res.render('example', { mayData: docs });
  });
});


//mail


router.post("/mail", function (request, response) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'gdp2.fastrack@gmail.com',
      pass: 'gdp21234'
    }
  });

  var mailOptions = {
    from: 'gdp2.fastrack@gmail.com',
    to: request.body.email1,
    subject: 'Coupon code for code registration',
    html: '<p>Hello,</p><p>Here is the coupon code that you need enter:</p>' + code + '<p>Thanks&Regards</p><p>conference team</p> ',
  };
  console.log(request.body.email1);
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      response.redirect('/faculty');
    }
  });
});

//----Admin----


router.post("/send", function (request, response) {
  db.collection('presenters').update({ 'email': request.body.email1 }, { $set: { 'confirm': "confirmed" } });
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'gdp2.fastrack@gmail.com',
      pass: 'gdp21234'
    }
  });

  var mailOptions = {
    from: 'gdp2.fastrack@gmail.com',
    to: request.body.email1,
    subject: 'Acceptance from Conference.',
    html: '<p>Hello,</p><p>Your application as a presenter to Conference is successfully accepted.</p><p>Here is the link to pay through card : <a href="http://127.0.0.1:8082/PayThroughCards"> Click here</a></br></p><p>Here is the link to pay through Cheque : <a href="http://127.0.0.1:8082/Paymentthroughcheck"> Click here</a></br></p><p>Thanks&Regards</p><p>conference team</p> ',
  };
  console.log(request.body.email1);
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      db.collection('presenters').find().toArray(function (err, result) {
        if (err) throw err;
        response.render('AdminPresenter.ejs', { list: result });

      });
    }
  });
});

  router.post("/sende",function(request,response){
    db.collection('presenters').update({'email' : request.body.email1},{$set:{'delete':"deleted"}});
    
   var transporter = nodemailer.createTransport({
     service: 'gmail',
     auth: {
       user: 'gdp2.fastrack@gmail.com',
       pass: 'gdp21234'
     }
   });
   
   var mailOptions = {
     from: 'gdp2.fastrack@gmail.com',
     to: request.body.email1,
     subject: 'Decline from Conference.',
     html: '<p>Hello,</p><p>We are sorry to inform you that, your application as a Presenter to the Conference is rejected.</p><p>Thanks&Regards</p><p>conference team</p> ',
   };
   transporter.sendMail(mailOptions, function(error, info){
     if (error) {
       console.log(error);
     } else {
       console.log('Email sent: ' + info.response);
       db.collection('presenters').find().toArray(function(err,result){
         if (err) throw err;
         response.render('AdminPresenter.ejs',{list : result});
       
     });
     }
   });
   });
  
// Reply in admin contact

router.post("/reply", function (request, response) {
  
  db.collection('contacts').update({ 'reply': request.body.reply }, { $set: { 'reply': "replied" } });
 
      db.collection('contacts').find().toArray(function (err, result) {
        if (err) throw err;
        response.redirect('/admincontact')

      });
    
  });
//payment status in adminattendee page

router.post("/pay", function (request, response) {
  db.collection('attendees').update({ 'email': request.body.email1 }, { $set: { 'pay': "paid" } });
 
      db.collection('attendees').find().toArray(function (err, result) {
        if (err) throw err;
        response.redirect('/adminattendee')

      });
    
  });
  //payment status in adminattendee page

router.post("/presenterpay", function (request, response) {
  db.collection('presenters').update({ 'email': request.body.email1 }, { $set: { 'pay': "paid" } });
 
      db.collection('presenters').find().toArray(function (err, result) {
        if (err) throw err;
        response.redirect('/AdminPresenter')

      });
    
  });
  router.post("/vendorpay", function (request, response) {
    db.collection('vendors').update({ 'email': request.body.email1 }, { $set: { 'pay': "paid" } });
    //db.collection('vendors').update({ 'pay': request.body.pay }, { $set: { 'pay': "paid" } });
   
        db.collection('vendors').find().toArray(function (err, result) {
          if (err) throw err;
          response.redirect('/adminvendor')
  
        });
      
    });

    

  //  Delete Deadlines Info from Database
 
  router.post("/deletedeadlines",function(request,response){
    var query = {"_id" : ObjectId(request.body.presId)};
    db.collection('deadlines').deleteOne(query,function(err, result){
      response.redirect('/Deadline')
   });
  });
  
 //  Delete Programs Info from Database

 router.post("/deletepgm",function(request,response){
   var query = {"_id" : ObjectId(request.body.presId)};
   db.collection('programdetails').deleteOne(query,function(err, result){
     response.redirect('/programdetails')
  });
 });
 
 //  Delete Fee Details Info from Database

 router.post("/deletefee",function(request,response){
   var query = {"_id" : ObjectId(request.body.presId)};
   db.collection('feedetails').deleteOne(query,function(err, result){
     response.redirect('/feedetails')
  });
 });

 //  Add Deadlines Info to Database

router.post("/new", (req, res) => {
 
 var myData = new Deadlines(req.body);
 myData.save()
 .then(item => {
   console.log(req.body)
   res.redirect('/Deadline');

})

.catch(err => {
 res.status(400).send("unable to save to database");
 });

});
  //  Add Fee Details Info to Database

router.post("/fee", (req, res) => {
 
 var myData = new FeeDetails(req.body);
 myData.save()
 .then(item => {
   res.redirect('/feedetails')
})
.catch(err => {
res.status(400).send("unable to save to database");
});
});

//  Add Program Details Info to Database

router.post("/pgm", (req, res) => {
 
 var myData = new ProgramDetails(req.body);
 myData.save()
 .then(item => {
   res.redirect('/programdetails')
})

.catch(err => {
res.status(400).send("unable to save to database");
});

});

//  Add or Drop Program Info to Database
router.post("/add", (req, res) => {
  
  var myData = new addprograms(req.body);
  myData.save()
  .then(item => {
    console.log(req.body)
    res.redirect('/Add');
 
 })
 
 .catch(err => {
  res.status(400).send("unable to save to database");
  });
 
 });

 //Update Prices
 router.post("/amount", (req, res) => {
  
  var myData = new amount(req.body);
  myData.save()
  .then(item => {
    console.log(req.body)
    res.redirect('/amount');
 
 })
 
 .catch(err => {
  res.status(400).send("unable to save to database");
  });
 
 });

//  Drop
router.post("/addpgm",function(request,response){
  var query = {"_id" : ObjectId(request.body.presId)};
  db.collection('addprograms').deleteOne(query,function(err, result){
    response.redirect('/Add')
 });
});

//Drop Conference name
router.post("/deletename",function(request,response){
  var query = {"_id" : ObjectId(request.body.presId)};
  db.collection('names').deleteOne(query,function(err, result){
    response.redirect('/conferencename')
 });
});


//Update amount
router.post("/updateamount/:id",function(request,response){
  var ty = String(request.params.id);
  var am = parseFloat(request.body.amount)
  console.log(ty)
  console.log(am)
  var query = {"type" : ty};
  var query1 = { $set: {"amount": am} };
  db.collection('amounts').updateOne(query, query1, function(err, result){
    response.redirect('/amount')
 });
});

//  Program Details (Room and all) mail option
router.post("/pgmmail",function(request,response){
  db.collection('programdetails').find().toArray(function(err,result){    
    if (err) throw err;
    db.collection('attendees').find().toArray(function(err,result1){  
      // console.log( result1)  
      if (err) throw err;
 var transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
     user: 'gdp2.fastrack@gmail.com',
     pass: 'gdp21234'
   }
 });
 let z=[];
 for (let i=0; i< result.length; i++){
  z.push("Time:"+result[i].Time,"Activity:"+result[i].Activity,"Location:"+result[i].Location+"<br><br>")
     }
     let mail=[];
     for (let i=0; i< result1.length; i++){
      console.log(result1[i].email)     
     mail.push(result1[i].email)
    }
     console.log(mail)
     
 var mailOptions = {

   from: 'gdp2.fastrack@gmail.com',
   to: mail,
   subject: 'Details Regarding the Conference',   
   html: '<p>Hello,</p>'+z+'<p>Here is the detailed schedule regarding conference </p> ',
 
  };
 transporter.sendMail(mailOptions, function(error, info){
   if (error) {
     console.log(error);
   } else {
     console.log('Email sent: ' + info.response);     
     response.render('UpdateProgramDetails.ejs',{list : result});
    }   
   });
  })
 });
 }); 



}
module.exports = router;