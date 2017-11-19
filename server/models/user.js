var mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    local: {
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        isDeleted: Boolean,
    }
});

module.exports = mongoose.model("user", userSchema);