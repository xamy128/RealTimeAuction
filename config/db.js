const mongoose = require('mongoose');
var connnection = mongoose.connect('mongodb://admin:admin@ds249355.mlab.com:49355/ashishtestapp');

module.export = connnection;