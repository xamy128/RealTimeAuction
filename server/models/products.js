var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductSchema = new Schema({
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
    MaxBidAmount : Number
    // name: String,
    // description:String,
    // image: String,
    // minPrice: Number,
    // userId: Number,
    // bidderId: Number,
    // isActive: Boolean,
    // isDeleted: Boolean,
    // isBidComplete: Boolean,
    // maxBidAmount: Number
    // bidStartDate: String,
    // bidEndDate: String,
    // createdDate: Date,
    // modifiedDate: Date,
    // __v : Number

});
module.exports = mongoose.model('products', ProductSchema);