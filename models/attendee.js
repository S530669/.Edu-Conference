var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Attendee = new Schema({
    "name": { type: String, required: true },
    "email": { type: String, required: true },
    "contact": { type: String, required: true },
    "school": { type: String, required: false },
    "program": { type: String, required: true },
    "food": { type: String, required: false },
    "restrict": { type: String, required: false }
});

module.exports = mongoose.model('Attendee', Attendee);




