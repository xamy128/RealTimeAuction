var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var url = 'mongodb://admin:admin@ds249005.mlab.com:49005/pm102realtimeauction';
url  = 'mongodb://localhost:27017/RealtimeAuction';
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
 //   SName: String,
   // SAge: String
    SupplierId : String,
    UserId : String,
    ProductId : String,
    ProductName : String,
    ProductDescription : String,
    ProductImage : String,
    ProductMinPrice : String,
    BidStartDate : String,
    BidEndDate : String,
    IsActive : String,
    IsDeleted : String,
    IsBidCompleted : String,
    MaxBidAmount : String

});

// Compile model from schema
var ProductModel = mongoose.model('ProductModel', ProductSchema);


// Create an instance of model SomeModel
var Product1Model = new ProductModel({
    SupplierId : '001',
    UserId : 'user1',
    ProductId : 'product1',
    ProductName : 'shoe',
    ProductDescription : 'it is a sports shoe',
    ProductImage : '',
    ProductMinPrice : '10euro',
    BidStartDate : '20-11-2017',
    BidEndDate : '23-11-2017',
    IsActive : '',
    IsDeleted : '',
    IsBidCompleted : 'No',
    MaxBidAmount : ''
});

// // Save the new model instance, passing a callback
// Product1Model.save(function (err) {
//     if (err) return handleError(err);
//     // saved!
// });




var products = mongoose.model('ProductModel', ProductSchema);

router.get('/', function(req, res, next) {
    res.render('admin', { title: 'admin page' });
});


router.get('/products', function(req, res, next) {
    //TODO
    //1: get data from db

    products.find({}).exec(function(err, rows) {
        if (err) {
            console.log('Error while getting products from DB');
        } else {
            console.log('Products are exist');
            //2: Pass data to products view (products.pug)
            res.render('products', { title: 'Product page', data: rows });
        };
    });
});



router.get('/product', function(req, res, next) {
    //Todo:
    //1: Get id from request
    var id = req.query.id;
    console.log("Product Id: ", id);

    //2: Get product details from db by using id
    products.findOne({_id: id}).exec(function(err, product) {
        if (err) {
            console.log('Error while getting a product from DB');
        } else {
            console.log('Product is exist');

            //3: Pass product to view (product.pug)
            res.render('product', { title: product.ProductName + ' page', data: product });
        };
    });

});

router.get('/DeleteProduct', function(req, res, next) {
    //Todo:
    //1: Get id from request
    var id = req.query.id;
    console.log("Product Id: ", id);

    //2: Delete product details from db by using id
    products.remove({_id: id}, function(err, row){
        if (err) {
            console.log('Error while getting a product from DB');
        } else {
            console.log('Product is exist');

            //3: Pass product to view (product.pug)
            products.find({}).exec(function(err, rows) {
                if (err) {
                    console.log('Error while getting products from DB');
                } else {
                    console.log('Products are exist');
                    //2: Pass data to products view (products.pug)
                    res.render('products', { title: 'Product page', data: rows });
                };
            });
        };}
    )
});


module.exports = router;




