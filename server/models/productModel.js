var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// product Schema

let Product = new Schema({
//id: { type: int, required: true, unique: true },
//id: int,
    //_id: {type : Schema.ObjectId, required: true},
    name: {type : String, default : 'default', required : true},
    description:{type : String, default : ''},
    image: {type : String, default : ''},
    minPrice: {type : Number, default : 0, required: true},
    supplierId: {type : String, default : 0, required: true},
    bidderId: {type : String, default : 0, required: true},
    isActive: {type : Boolean, default : true},
    isDeleted: {type : Boolean, default : false},
    isBidComplete: {type : Boolean, default : false},
    maxBidAmount: {type : Number, default : 0, required: true},
    bidStartDate: {type : Date, default : Date.now, required: true},
    bidEndDate: {type : Date, default : Date.now, required: true},
    createdDate: {type : Date, default : Date.now, required: true},
    modifiedDate: {type : Date, default : Date.now, required: true}
});


var exports = module.exports = mongoose.model('product', Product);
