var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    userRole: String,
    isDeleted: Boolean
});

module.exports = mongoose.model("user", userSchema);