var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Faculty = new Schema({
    "name": {type:String, required:true},
    "email": {type: String, required: true},
    "contact": {type: String, required: true},
    "food": {type:String, required:true},
    "restrict": {type:String, required:true}
    });

module.exports =  mongoose.model('Faculty', Faculty);