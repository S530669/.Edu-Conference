var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Graduatestudent = new Schema({
    "name": {type:String, required:true},
    "email": {type: String, required: true},
	"contact": {type: String, required: true},
    "topic": {type:String, required:true},
    "Presenter": {type:String, required:true},
    "food": {type:String, required:false},
    "restrict": {type:String, required:false}
    });

module.exports =  mongoose.model('Graduatestudent', Graduatestudent);