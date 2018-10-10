var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Contact = new Schema({
    "firstname": {type:String, required:true},
    "lastname": {type: String, required: true},
    "mail": {type: String, required: true},
    "subject": {type: String, required: true}
	
    });

module.exports =  mongoose.model('Contact', Contact);