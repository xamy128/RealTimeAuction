var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var url = 'mongodb://admin:admin@ds249005.mlab.com:49005/pm102realtimeauction';
//url  = 'mongodb://localhost:27017/RealtimeAuction';
const db = mongoose.connect(url, {
    server: {
        socketOptions: {
            keepAlive: 1
        }
    }
}).connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define schema
var Schema = mongoose.Schema;

var ProductSchema = new Schema({

    modifiedDate : String,
    createdDate : String,
    bidEndDate : String,
    bidStartDate : String,
    maxBidAmount :String,
    isBidComplete : false,
    isDeleted : false,
    isActive : false,
    bidderId : String,
    userId : String,
    minPrice : String,
    image : String,
    description : String,
    name : String,

});

// Compile model from schema
//var ProductModel = mongoose.model('ProductModel', ProductSchema);

var products = mongoose.model('products', ProductSchema);
// Create an instance of model SomeModel
var pro = new products({
    modifiedDate : '23-11-2017',
    createdDate : '21-11-2017',
    bidEndDate : '07-11-2017',
    bidStartDate : '06-11-2017',
    maxBidAmount :'2000',
    isBidComplete : false,
    isDeleted : false,
    isActive : false,
    bidderId : '123',
    userId : '345',
    minPrice : '500',
    image : '',
    description : 'abc',
    name : 'car',

});

// pro.save(function (err) {
//   if (err) {
//  console.log("Error while inserting user: ", err);
// }
// else
// {
//  console.log("User saved")
// }
// //saved!
// });





router.get('/', function(req, res, next) {
    let id = req.query.id;
    console.log('id ', id);

    products.findOne({_id: id}).exec(function (err, product) {
        if (err) {
            console.log('Error while getting a product from DB');
        } else {
            console.log('no error');
            // console.log(product);
            res.render('bidding', { title: 'bidding page', product: product });
        }
        //console.log('user ', user);
        // if (user) {
        //     if (user.userRole === 'admin') {
        //         console.log('admin');
        //         res.render('index', {title: 'Welcome ' + user.UserName});
        //     }
        //     else {
        //         console.log('not admin');
        //         res.render('product');
        //     }
        // }
        //
        // //res.render('index', { title: 'Welcome '+ user.UserName });
        // else {
        //     console.log('user does not exist Please Sign Up');
        //     res.render('signup');
        // }


    });



});


router.get('/test', function(req, res, next) {

    res.render('test');
});


router.get('/bidding', function(req, res, next) {

    //TODO
    //1: get data from db

    // products.find({}).exec(function(err, rows) {
    //     if (err) {
    //         console.log('Error while getting products from DB');
    //     } else {
    //         console.log('Products are exist');
    //         //2: Pass data to products view (products.pug)
    //         res.render('bidding', { title: 'Bidding page', data: rows });
    //     };
    // });
});


router.get('/bidding', function(req, res, next) {
    //Todo:
    //1: Get id from request
    var id = req.query.id;
    console.log("Product Id: ", id);

    //2: Get product details from db by using id
    products.findOne({_id: id}).exec(function(err, product) {
        if (err) {
            console.log('Error while getting a product from DB');
        } else {
            console.log('Product  exist');

            //3: Pass product to view (product.pug)
            res.render('bidding', { title: product.ProductName + ' page', data: product });
        };
    });

});


module.exports = router;