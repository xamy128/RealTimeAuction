const mongoose = require('mongoose');
let mongo = mongoose.connect('mongodb://localhost/test');
//'mongodb://<dbuser>:<dbpassword>@ds249355.mlab.com:49355/ashishtestapp');

module.exports = mongo.connection;


