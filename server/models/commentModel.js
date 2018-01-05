var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// product Schema

let CommentSchema = new Schema({
    createdDate : String,
    bidderId : String,
    userId : String,
    message : String,
    productId: String,
    commentId: String,
    parentId: String



});

var exports = module.exports = mongoose.model('Comment', CommentSchema);
