require('../config/db');
var mongoose = require('mongoose');
var collections = require('../utils/models');
// product Schema

let Product = new Schema({
//id: { type: int, required: true, unique: true },
//id: int,
    //_id: {type : Schema.ObjectId, required: true},
    name: {type : String, default : 'default', required : true},
    description:{type : String, default : ''},
    image: {type : String, default : ''},
    minPrice: {type : Number, default : 0, required: true},
    userId: {type : Number, default : 0, required: true},
    bidderId: {type : Number, default : 0, required: true},
    isActive: {type : Boolean, default : true},
    isDeleted: {type : Boolean, default : false},
    isBidComplete: {type : Boolean, default : false},
    maxBidAmount: {type : Number, default : 0, required: true},
    bidStartDate: {type : String, default : Date.now, required: true},
    bidEndDate: {type : String, default : Date.now, required: true},
    createdDate: {type : Date, default : Date.now, required: true},
    modifiedDate: {type : Date, default : Date.now, required: true}
});


var exports = module.exports = mongoose.model('product', Product);
