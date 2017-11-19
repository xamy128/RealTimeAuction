var mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    local: {
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String
    }
});

module.exports = mongoose.model("user", userSchema);