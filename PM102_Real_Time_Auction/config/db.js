const mongoose = require('mongoose');
let connnection = mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds249355.mlab.com:49355/ashishtestapp');

module.export = connnection;