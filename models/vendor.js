var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var vendor = new Schema({

    "Vendor": { type: String, required: true },
    "cname": { type: String, required: true },
    "city": { type: String, required: true },
    "State": { type: String, required: true },
    "Zip": { type: Number, required: true },
    "URL": { type: String, required: true },
    "name": { type: String, required: true },
    "Title": { type: String, required: true },
    "email": { type: String, required: true },
    "contact": { type: String, required: true },
    "pay": { type: String, required: true }
});

module.exports = mongoose.model('vendor', vendor);
