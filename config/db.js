const mongoose = require('mongoose');
//let Factory = require('./utils/schemaFactoty');

//let connnection = function () {
    mongoose.connect('mongodb://admin:admin@ds249005.mlab.com:49005/pm102realtimeauction');
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once("open", function (callback) {
        console.log("Connection succeeded.");
    });

 //   let factory = new Factory();
  //  factory.createSchemas();
//};
module.export = Schema = mongoose.Schema;