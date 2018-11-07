var MongoClient = require('mongodb').MongoClient;
const db = module.exports = {
url : "mongodb://localhost/27017/conference"
};

MongoClient.connect('mongodb://localhost:27017/conference',function(err,db){
if(err)
{
console.log(err);
}
else
{
console.log("Connected to db");
const collection= db.collection("attendees");
var cursor = collection.find({});
cursor.each(function(err, doc) {

console.log(doc); 
});
console.log("Success"); 
db.close(); 
}
}); 


// var MongoClient = require('mongodb').MongoClient;
// var url = 'mongodb://localhost:27017/conference';

// MongoClient.connect(url, function(err, db) {

//     var cursor = db.collection("Attendees").find();

//     cursor.each(function(err, doc) {

//         console.log(doc);

//     });
// })