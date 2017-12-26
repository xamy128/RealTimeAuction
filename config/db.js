
var mongoose = require('mongoose');
var url = 'mongodb://admin:admin@ds249005.mlab.com:49005/pm102realtimeauction';
var db = mongoose.connect(url, {
    server: {
        socketOptions: {
            keepAlive: 1
        }
    }
}).connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/**
 * @file create a connection to db
 * @author F. Rahmati
 */
//const mongoose = require('mongoose');
//let mongo = mongoose.connect('mongodb://localhost/test');
//'mongodb://<dbuser>:<dbpassword>@ds249355.mlab.com:49355/ashishtestapp');

//module.exports = mongo.connection;