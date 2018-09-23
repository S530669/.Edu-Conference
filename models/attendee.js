var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Attendee = new Schema({
    "name1": {type:String, required:true},
    "email": {type: String, required: true},
    "contact": {type: String, required: true},
    "school": {type: String, required: false},
	"program": {type: String, required: true},
    "presenter": {type:String, required:true}, 
    "food": {type:String, required:true},
    "restrict": {type:String, required:true}
    });

module.exports =  mongoose.model('Attendee', Attendee);




