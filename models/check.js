var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var checkpayments = new Schema({
    "name": {type:String, required:true},
    "check number": {type:String, required:true},
    "name of the bank":{type:String, required:true},
    "Date":{type:String, required:true}
           
    });

module.exports =  mongoose.model('checkpayments', checkpayments);