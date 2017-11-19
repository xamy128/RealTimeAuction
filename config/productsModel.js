const mongoose = require('mongoose');
var connection = require('../config/db.js');

var productSchema = mongoose.Schema({
    SupplierId : String,
    UserId : String,
    ProductId : String,
    ProductName : String,
    ProductDescription : String,
    ProductImage : String,
    ProductMinPrice : Number,
    BidStartDate : Date,
    BidEndDate : Date,
    IsActive : Boolean,
    IsDeleted : Boolean,
    IsBidCompleted : Boolean,
    MaxBidAmount :Number
});

var products = connection.model('products', productSchema);

module.exports = products;