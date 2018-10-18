var path = require('path');
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser'); 
var app = express();   
var nodemailer = require('nodemailer');
var randomstring = require('randomstring');
var Promise = require('bluebird');
var mongoose = require('mongoose');
var db = mongoose.connection;
var cookieParser = require('cookie-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var ObjectId =require('mongodb').ObjectID;


var routes = require('./routes/index');
var users = require('./routes/users');

mongoose.connect('mongodb://localhost:27017/conference');
var Attendee = require('./models/attendee.js');
var Presenter = require('./models/presenter.js');
var vendor = require('./models/vendor.js');
var Contact = require('./models/contact.js');
var User = require('./models/user.js');
var Deadlines = require('./models/Deadlines.js');
var FeeDetails = require('./models/FeeDetails.js');
var ProgramDetails = require('./models/ProgramDetails.js');



app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var code = randomstring.generate(8);
var count = 0;


app.use('/', routes);
app.use('/users', users);
app.use(express.static(path.join(__dirname, 'Assets')));
app.use(express.static('./'));

//Attendee
app.post("/attendee", (req, res) => {
  var myData1 = new Attendee(req.body);
  var count1 =  db.collection('attendees').find({'email':req.body.email}).count();
  count1.then(function(result){
    if(result == 0) {
  myData1.save()
  .then(item => {
    var query = {name: req.get.name};
    //console.log( req.body.name1)
    db.collection('attendees').find(query).toArray(function(err, result){
      
      if (err) throw err;
      if(req.body.food == null){
        var amount = '$'+(125);
      }
      else{
        var amount = '$'+(125+20);
      }
      res.render('cart.ejs',{list : req.body.name, list1 : req.body.email, amount });
    })
})
.catch(err => {
  res.status(400).send("unable to save to database");
  });
}else
res.send('Email is already registered')
 })
});

//Presenter
app.post("/presenter", (req, res) => {
  var myData = new Presenter(req.body);
  var count1 =  db.collection('presenters').find({'email':req.body.email}).count();
  var amount='130';
  count1.then(function(result){
    if(result == 0) {
  myData.save()
  .then(item => {
    var query = {name: req.get.name};
    //console.log( req.body.name1)
    db.collection('presenter').find(query).toArray(function(err, result){
      
      if (err) throw err;
      res.render('presenterconf.ejs');
    })
})
.catch(err => {
  res.status(400).send("unable to save to database");
  });
}else
res.send('Email is already registered')
 })
});

//Faculty
app.post("/faculty", (req, res) => {
  
  var myData = new Attendee(req.body);
  var count1 =  db.collection('attendees').find({'email':req.body.email}).count();
  count1.then(function(result){
    if(result == 0) {
  myData.save()
  .then(item => {
    var query = {name: req.get.name};
    //console.log( req.body.name1)
    db.collection('attendees').find(query).toArray(function(err, result){
      
      if (err) throw err;
    res.render('couponcode.ejs',{code1 : code});
   // res.send("Items saved succaxessfully");
})
  })
.catch(err => {
  res.status(400).send("unable to save to database");
  });
}else
res.send('Email is already registered');
  })
});

//Graduate Student
app.post("/graduatestudent", (req, res) => {
  var myData1 = new Attendee(req.body);
  var count1 =  db.collection('attendees').find({'email':req.body.email}).count();
  count1.then(function(result){
    if(result == 0) {
      myData1.save()
      .then(item => {
        db.collection('attendees').find().toArray(function(err, result){
          
          if (err) throw err;
          if(req.body.food == null){
            var amount = '$'+(125);
          }
          else{
            var amount = '$'+(125+20);
          }
          res.render('cart.ejs',{list : req.body.name, list1 : req.body.email, amount });
        })
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
      });
    }else
  res.send('Email is already registered')
   })
  });

//vendor
app.post("/vendor", (req, res) => {
  var myData1 = new vendor(req.body);
  var count1 =  db.collection('vendors').find({'email':req.body.email}).count();
  count1.then(function(result){
    if(result == 0) {
  myData1.save()
  .then(item => {
    db.collection('vendors').find().toArray(function(err, result){
      if (err) throw err;
      if(req.body.food == null){
        var amount = '$'+(125);
      }
      else{
        var amount = '$'+(125+20);
      }
      res.render('cart.ejs',{list : req.body.name, list1 : req.body.email, amount });
    })
    //res.send("Items saved successfully");
})
.catch(err => {
  res.status(400).send("unable to save to database");
  });
}else
res.send('Email is already registered')
  });
});

//contact
app.post("/contact", (req, res) => {
  
  var myData = new Contact(req.body);
  myData.save()
  .then(item => {
   res.send("Items saved successfully");

 })

.catch(err => {
 res.status(400).send("unable to save to database");
 });

});

//Forgot Password

app.post("/forgotP", (req, res) => {
  var myData1 = new User(req.body);
  var count1 =  db.collection('users').find({'email':req.body.email}).count();
  count1.then(function(result){
    if(result == 0) {
      res.send('This email is not registered');
  } else {
    res.render('forgotP.ejs')
  }
  });
});

//Reset

app.post("/reset", (req, res) => {
  var myData1 = new User(req.body);
var newP = req.body.npassword
var confirmP = req.body.cpassword;
if(newP != confirmP){
  res.send('Passwords donot match')
} else{
 
}
});


// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');

app.get('/view', function(req, res){
  Attendee.find({}, function(err, docs){
    if(err) res.json(err);
    else res.render('example', {mayData:docs});
  });
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
  to: request.body.email1,
  subject: 'Coupon code for code registration',
  html: '<p>Hello,</p><p>Here is the coupon code that you need enter:</p>'+ code +'<p>Thanks&Regards</p><p>.edu team</p> ',
};
console.log(request.body.email1);
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
    response.render('faculty.ejs');
  }
});
});

//----Admin----

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});


app.post("/send",function(request,response){
   db.collection('presenters').update({'email' : request.body.email1},{$set:{'confirm':"confirmed"}});
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
    subject: 'Acceptance from .EDU Conference.',
    html: '<p>Hello,</p><p>Your application as a presenter to .EDU Conference is successfully accepted.</p><p>Thanks&Regards</p><p>.edu team</p> ',
  };
  console.log(request.body.email1);
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

  app.post("/sende",function(request,response){
    var query = {"_id" : ObjectId(request.body.presId)};
    db.collection('presenters').deleteOne(query,function(err, result){
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
     subject: 'Decline from .EDU Conference.',
     html: '<p>Hello,</p><p>We are sorry to inform you that, your application as a Presenter to .EDU Conference is rejected.</p><p>Thanks&Regards</p><p>.edu team</p> ',
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
  });


  //  Delete Deadlines Info from Database
 
  app.post("/deletedeadlines",function(request,response){
    var query = {"_id" : ObjectId(request.body.presId)};
    db.collection('deadlines').deleteOne(query,function(err, result){
      response.redirect('/Deadlines')
   });
  });
  
 //  Delete Programs Info from Database

 app.post("/deletepgm",function(request,response){
   var query = {"_id" : ObjectId(request.body.presId)};
   db.collection('programdetails').deleteOne(query,function(err, result){
     response.redirect('/programdetails')
  });
 });
 
 //  Delete Fee Details Info from Database

 app.post("/deletefee",function(request,response){
   var query = {"_id" : ObjectId(request.body.presId)};
   db.collection('feedetails').deleteOne(query,function(err, result){
     response.redirect('/feedetails')
  });
 });

 //  Add Deadlines Info to Database

app.post("/new", (req, res) => {
 
 var myData = new Deadlines(req.body);
 myData.save()
 .then(item => {
   console.log(req.body)
   res.redirect('/Deadlines');

})

.catch(err => {
 res.status(400).send("unable to save to database");
 });

});
  //  Add Fee Details Info to Database

app.post("/fee", (req, res) => {
 
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

app.post("/pgm", (req, res) => {
 
 var myData = new ProgramDetails(req.body);
 myData.save()
 .then(item => {
   res.redirect('/programdetails')
})

.catch(err => {
res.status(400).send("unable to save to database");
});

});

app.set('port',(process.env.PORT || 8082));

app.listen(app.get('port'), function () {
 console.log('App listening on http://127.0.0.1:8082/') 
})







