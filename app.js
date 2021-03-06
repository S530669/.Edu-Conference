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
var multer = require('multer');
var async = require('async');
var crypto = require('crypto');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var ObjectId = require('mongodb').ObjectID;
var bcrypt = require('bcryptjs');


const port = process.env.PORT || 8082;



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
var addprograms = require('./models/add drop program.js');
var Name = require('./models/conferencename.js');
var amount = require('./models/amount.js');




app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({ defaultLayout: 'layout' }));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var code = randomstring.generate(8);
var count = 0;

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
  errorFormatter: function (param, msg, value) {
    var namespace = param.split('.')
      , root = namespace.shift()
      , formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
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

app.use('/', routes);
app.use('/users', users);
app.use(express.static(path.join(__dirname, 'Assets')));
app.use(express.static('./'));

//Attendee
app.post("/attendee", (req, res) => {
  var myData1 = new Attendee(req.body);
  var count1 = db.collection('attendees').find({ 'email': req.body.email }).count();
  count1.then(function (result) {
    if (result == 0) {
      myData1.save()
        .then(item => {
          var attendee = 0
          var food = 0
          db.collection('amounts').find().toArray(function(err,result){
           // console.log("Result:"+result)
            if(result && result instanceof Array){
              //console.log(result.length)
              for(var i = 0; i< result.length; i++){
                //console.log(result[i])
                if(result[i]['type'] == 'Attendee')
                  attendee = parseFloat(result[i]['amount'])
                else if(result[i]['type'] == 'Food')
                    food = parseFloat(result[i]['amount'])
              }
            }
          db.collection('attendees').find().toArray(function (err, result) {
            if(req.body.program instanceof Array)
            var n = req.body.program.length;
            else
            var n = req.body.program.split(",").length;
            if (err) throw err;
            if (req.body.food == null) {  
              var amount1 = 0;
            }
            else {
              var amount1 = food;
            }
            if(n > 1) {
              var amount2 = attendee * n
            }
            else{
              var amount2 = attendee;
            }
            var amount = amount1 + amount2
            res.render('cart.ejs', { list: req.body.fname,list1: req.body.lname,list2: req.body.email, amount, quantity: n });
          })
          })
        })
        .catch(err => {
          res.status(400).send("unable to save to database");
        });
    } else
      res.send('Email is already registered')
  })
});

//Presenter
app.post("/presenter", (req, res) => {
  var myData = new Presenter(req.body);
  var count1 = db.collection('presenters').find({ 'email': req.body.email }).count();
  var amount = '130';
  count1.then(function (result) {
    if (result == 0) {
      myData.save()
        .then(item => {

          db.collection('presenter').find().toArray(function (err, result) {

            if (err) throw err;
            res.render('presenterconf.ejs');
          })
        })
        .catch(err => {
          res.status(400).send("unable to save to database");
        });
    } else
      res.send('Email is already registered')
  })
});
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'Assets/images');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
var upload = multer({ storage: storage }).single('userPhoto');
app.post('/upload', function (req, res) {
  console.log("hiii");
  upload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    res.end("File is uploaded");
  });
});
//Faculty
app.post("/faculty", (req, res) => {

  var myData = new Attendee(req.body);
  var count1 = db.collection('attendees').find({ 'email': req.body.email }).count();
  count1.then(function (result) {
    if (result == 0) {
      myData.save()
        .then(item => {
          var query = { name: req.get.name };
          //console.log( req.body.name1)
          db.collection('attendees').find(query).toArray(function (err, result) {

            if (err) throw err;
            res.render('couponcode.ejs', { code1: code });
            // res.send("Items saved succaxessfully");
          })
        })
        .catch(err => {
          res.status(400).send("unable to save to database");
        });
    } else
      res.send('Email is already registered');
  })
});

//Graduate Student
app.post("/graduatestudent", (req, res) => {
  var myData1 = new Attendee(req.body);
  var count1 = db.collection('attendees').find({ 'email': req.body.email }).count();
  count1.then(function (result) {
    if (result == 0) {
      myData1.save()
        .then(item => {
          var graduate = 0
          var food = 0
          db.collection('amounts').find().toArray(function(err,result){
           // console.log("Result:"+result)
            if(result && result instanceof Array){
             // console.log(result.length)
              for(var i = 0; i< result.length; i++){
                //console.log(result[i])
                if(result[i]['type'] == 'Graduate Student')
                  student = parseFloat(result[i]['amount'])
                else if(result[i]['type'] == 'Food')
                    food = parseFloat(result[i]['amount'])
              }
            }
          db.collection('attendees').find().toArray(function (err, result) {

           if(req.body.program instanceof Array)
            var n = req.body.program.length;
            else
            var n = req.body.program.split(",").length;
            if (err) throw err;
            if (req.body.food == null) {  
              var amount1 = 0;
            }
            else {
              var amount1 = food;
            }
            if(n > 1) {
              var amount2 = student * n
            }
            else{
              var amount2 = student;
            }
            var amount = amount1 + amount2
            res.render('cart.ejs', { list: req.body.fname,list1: req.body.lname,list2: req.body.email, amount, quantity: n });
          })
        })
        })
        .catch(err => {
          res.status(400).send("unable to save to database");
        });
    } else
      res.send('Email is already registered')
  })
});

//vendor
app.post("/vendor", (req, res) => {
  var myData1 = new vendor(req.body);
  var count1 = db.collection('vendors').find({ 'email': req.body.email }).count();
  count1.then(function (result) {
    if (result == 0) {
      myData1.save()
        .then(item => {
          var graduate = 0
          var food = 0
          db.collection('amounts').find().toArray(function(err,result){
           // console.log("Result:"+result)
            if(result && result instanceof Array){
             // console.log(result.length)
              for(var i = 0; i< result.length; i++){
                //console.log(result[i])
                if(result[i]['type'] == 'Vendor')
                  vendor = parseFloat(result[i]['amount'])
              }
            }
          db.collection('vendors').find().toArray(function (err, result) {
            var amount = vendor;
            res.render('cart.ejs', { list: req.body.cname, list1: req.body.lname, list2: req.body.email, amount, quantity: 1 });
          })
        })
          //res.send("Items saved successfully");
        })
        .catch(err => {
          res.status(400).send("unable to save to database");
        });
    } else
      res.send('Email is already registered')
  });
});

 //  Pay through Check Info to Database

 app.post("/views", (req, res) => {
  
  var myData = new checkpayments(req.body);
  myData.save()
  .then(item => {
    console.log(req.body)
    res.redirect('/');
 
 })
 
 .catch(err => {
  res.status(400).send("unable to save to database");
  });
 
 });

//contact
app.post("/contact", (req, res) => {

  var myData = new Contact(req.body);
  myData.save()
    .then(item => {
      res.render("contact.ejs");

    })

    .catch(err => {
      res.status(400).send("unable to save to database");
    });

});

//Store name into database
app.post("/conferencename", (req, res) => {
  
    var myData = new Name(req.body);
    myData.save()
      .then(item => {
        res.redirect('/conferencename');
  
      })
  
      .catch(err => {
        //console.log(err);
        res.status(400).send("unable to save to database");
      });
  
  });


//deletequantity

app.post('/del', function(req,res){
  var query = {"email" : (req.body.email2)};
   db.collection('attendees').deleteOne(query)
   .then(item=>{
     res.redirect("/");
   })
   .catch(err =>{
     res.status(400).send("unable to delete");
   })
})
//Forgot

app.post('/forgot', function(req, res, next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
          req.flash('error_msg', 'No account with that email address exists.');
          return res.redirect('back');
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {

          
          user: 'gdp2.fastrack@gmail.com',
          pass: 'gdp21234'
        }
      });
      var mailOptions = {
        to: req.body.email,
        from: 'passwordreset@demo.com',
        subject: 'Conference Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('success_msg', 'An e-mail has been sent to ' + req.body.email + ' with further instructions.');
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
    res.redirect('/forgotE');
  });
}); 

//Reset Get
app.get('/reset/:token', function(req, res) {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('/forgot');
    }
    res.render('forgotP.ejs', {
      token: req.params.token
    });
  });
});

//Reset
app.post('/reset/:token', function(req, res) {
  async.waterfall([
    function(done) {
      User.findOne({ resetPasswordToken: req.body.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          req.flash('error', 'Password reset token is invalid or has expired.');
          return res.redirect('/users/login');
        }

        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(req.body.password, salt, function (err, hash) {
            user.password = hash;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            user.save(function(err) {
              req.logIn(user, function(err) {
                 done(err, user);
              });
             });
          });
        });
        
        

        
      }   );
    },
    function(user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: 'gdp2.fastrack@gmail.com',
          pass: 'gdp21234'
        }
      });
      var mailOptions = {
        to: req.user.email,
        from: 'passwordreset@demo.com',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + req.user.email + ' has just been changed.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('success', 'Success! Your password has been changed.');
        done(err);
      });
    }
  ], function(err) {
    res.redirect('/users/login');
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})