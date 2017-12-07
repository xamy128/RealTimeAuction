const mongoose = require('mongoose');
let mongo  = mongoose.connect('mongodb://admin:admin@ds249005.mlab.com:49005/pm102realtimeauction');
module.exports = mongo.connection;