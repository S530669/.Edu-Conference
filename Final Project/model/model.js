let mongoose = require("mongoose");
let Schema = mongoose.Schema;

var Attendee = new Schema({
    "name": {type:String, required:true},
    "email": {type: String, required: true},
	"contact": {type: String, required: true},
	"program": {type: String, required: true},
    "presenter": {type:String, required:true}
    });

var Faculty = new Schema({
        "name": {type:String, required:true},
        "email": {type: String, required: true},
        "contact": {type: String, required: true},
    }); 
	
var Presenter = new Schema({
    "name": {type:String, required:true},
    "email": {type: String, required: true},
	"contact": {type: String, required: true},
	"school": {type: String, required: true},
    "level": {type:String, required:true},
	"topic": {type:String, required:true},
	"attach": {type:String, required:false}
    });
	
var Vendor = new Schema({
    "name": {type:String, required:true},
    "email": {type: String, required: true},
	"contact": {type: String, required: true},
    });
  
	

var AttendeeModel = mongoose.model("tasks", Attendee);
var PresenterModel = mongoose.model("tasks", Presenter);
var VendorModel = mongoose.model("tasks", Vendor);
var FacultyModel = mongoose.model("tasks",Faculty);
module.exports = Attendee;
module.exports = Presenter;
module.exports = Vendor;
module.exports = Faculty;
