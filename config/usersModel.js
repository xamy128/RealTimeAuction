const mongoose = require('mongoose');
var connection = require('../config/db.js');

var userSchema = mongoose.Schema({
    UserId : String,
    UserRole: String,
    FirstName: String,
    LastName: String,
    Email: String,
    Phone: String,
    UserName: String,
    Password: String,
    IsDeleted: Boolean
});

var users = connection.model('users', userSchema);

module.exports = users;