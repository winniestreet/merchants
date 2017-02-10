var mongoose    =   require("mongoose");
// create instance of Schema
var mongoSchema =   mongoose.Schema;
// create schema
var merchantSchema  = new mongoSchema ({
    "merchantUsername" : String,
    "merchantEmail" : String,
    "merchantPassword" : String,
    "phone": String,
    "web_url": String,
    "merchant_id": Number,
    "address": {
        "country": String,
        "state": String,
        "postcode": String,
        "suburb": String,
        "address1": String
    },
    "date_modified": Date,
    "date_created": Date,
    "status": String,
    "logo" : String

});
// create model if not exists.
module.exports = mongoose.model('Merchant', merchantSchema);
