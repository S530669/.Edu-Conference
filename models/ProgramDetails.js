var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProgramDetails = new Schema({
    "Time": {type:String, required:true},
    "Activity": {type: String, required: true},
    "Location": {type: String, required: true}
    
    });

module.exports =  mongoose.model('ProgramDetails', ProgramDetails);