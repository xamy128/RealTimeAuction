var mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    local: {
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String
    }
//     facebook: {
//         userid: String,
//         userRole: String,
//         firstName: String,
//         lastName: String,
//         userImage: String,
//         email: String,
//         phone: String,
//         password: String,
//         isDeleted: Boolean
// },
//     google: {
//         userRole: String,
//         firstName: String,
//         lastName: String,
//         userImage: String,
//         email: String,
//         phone: String,
//         password: String,
//         isDeleted: Boolean
// }
});

module.exports = mongoose.model("user", userSchema);

// let _userId = String,
// _userRole = String,
// _firstName = String,
// _lastName = String,
// _userImage = String,
// _email = String,
// _phone = String,
// _password = String,
// _isDeleted = String = false;

// class User{
//     constructor(userId, userRole, firstName, lastName, userImage, email, phone, password, isDeleted){
//         this._userId = userId;
//         this._userRole = userRole;
//         this._firstName = firstName;
//         this._lastName = lastName;
//         this._userImage = userImage;
//         this._email = email;
//         this._phone = phone;
//         this._password = password;
//         this._isDeleted = isDeleted;
//     }
// }

// module.exports = User;
