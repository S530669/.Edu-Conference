var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Attendee = new Schema({
    "name": {type:String, required:true},
    "email": {type: String, required: true},
    "contact": {type: String, required: true},
    "school": {type: String, required: false},
	"program": {type: String, required: true},
    "presenter": {type:String, required:true}, 
    "food": {type:String, required:true},
    "restrict": {type:String, required:true}
    });

// var Faculty = new Schema({
//         "category": {type:String, required:true},
//         "company": {type: String, required: true},
//         "city": {type: String, required: true},
//         "state": {type: String, required: true},
//         "zip": {type: String, required: true},
//         "website": {type: String, required: true},
//         "name": {type: String, required: true},
//         "title": {type: String, required: true},
//         "email": {type: String, required: true},
//         "contact": {type: String, required: true}
//     }); 
	
// var Presenter = new Schema({
//     "name": {type:String, required:true},
//     "email": {type: String, required: true},
// 	"contact": {type: String, required: true},
// 	"school": {type: String, required: true},
//     "level": {type:String, required:true},
// 	"topic": {type:String, required:true},
// 	"attach": {type:String, required:false}
//     });
	
// var Vendor = new Schema({
//     "name": {type:String, required:true},
//     "email": {type: String, required: true},
// 	"contact": {type: String, required: true},
//     });


// var Student = new Schema({
//         "name": {type:String, required:true},
//         "email": {type: String, required: true},
//         "contact": {type: String, required: true},
//         "program": {type: String, required: true},
//         "presenter": {type:String, required:true}
//         });



module.exports = mongoose.model('Product', Attendee);



// model.exports = Presenter;
// model.exports = Vendor;
// model.exports = Faculty;
// model.exports = Student;
