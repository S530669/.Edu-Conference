var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Presenter = new Schema({
    "name": {type:String, required:true},
    "email": {type: String, required: true},
	"contact": {type: String, required: true},
    "level": {type:String, required:true},
	"topic": {type:String, required:true},
    "attach": {type:String, required:false},
    "food": {type:String, required:false},
    "restrict": {type:String, required:false}
    });

module.exports =  mongoose.model('Presenter', Presenter);