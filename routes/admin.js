let path = require('path');
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

//Product
var ProductSchema = new Schema({
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
    IsDeleted : Boolean,
    IsBidCompleted : String,
    MaxBidAmount : String
});

//User
var UserSchema = new Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        userRole: String,
        isDeleted: Boolean
});

// Compile model from schema
var ProductModel = mongoose.model('ProductModel', ProductSchema);


// Create an instance of model SomeModel
var Product1Model = new ProductModel({
    // SupplierId : '001',
    // UserId : 'user1',
    // ProductId : 'product1',
    // ProductName : 'shoe',
    // ProductDescription : 'it is a sports shoe',
    // ProductImage : '',
    // ProductMinPrice : '10euro',
    // BidStartDate : '20-11-2017',
    // BidEndDate : '23-11-2017',
    // IsActive : '',
    // IsDeleted : false,
    // IsBidCompleted : 'No',
    // MaxBidAmount : ''
});

var UserModel = mongoose.model('UserModel', UserSchema);


// Create an instance of model SomeModel
var UserModel = new UserModel({
    // username: 'Simil',
    // password: '',
    // firstName: 'Simil',
    // lastName: 'Susan',
    // email: '',
    // userRole: '',
    // isDeleted: false
});



// // Save the new model instance, passing a callback
// UserModel.save(function (err) {
//      if (err) return handleError(err);
//       //saved!
//  });




var products = mongoose.model('ProductModel', ProductSchema);

var users = mongoose.model('UserModel', UserSchema);



router.get('/', function(req, res, next) {
    res.render('admin', { title: 'Real Time Auction' });
});





router.post('/searchProduct', function(req, res, next) {
    //Todo:
    //1: Get productname from request
    var name = req.body.productName;
    console.log("Product name: ", name);

    //2: Get product details from db by using id
    products.findOne({ProductName: name} ).exec(function(err, product) {
        if (err) {
            console.log('Error while getting a product from DB');
        } else {
            console.log('Product fetched:', product)
            //3: Check if the product exists
            if (!product){
                console.log('Product is not there');
                res.render('popup', {title: 'Product does not exist'});
            }
            else{
                //4: Check if product is already removed
                if ( product.IsDeleted === true  ){
                    console.log('Product is already deleted');
                    res.render('popup', {title: 'Product is already deleted'});
                }
                else{
                    console.log('Product is exists');
                    //4: Pass product to view (searchProduct.pug)
                    res.render('searchProduct', { title: product.ProductName + ' page', data: product });
                }

            }
        };
    });

});

router.get('/DeleteProduct', function(req, res, next) {
    //Todo:
    //1: Get id from request
    var id = req.query.id;
    console.log("Product Id: ", id);
    //2: Delete product details from db by using id
    products.update({_id: id}, {IsDeleted:true}, function(err, row){
        if (err) {
            console.log('Error while deleting a product from DB');
        } else {
            console.log('Product is deleted:');
            //3: Return to main page
            res.render('admin', { title: 'Real Time Auction' });
            //});
        };}
    )
});

router.post('/userProfile', function(req, res, next) {
    //Todo:
    //1: Get username from request
    var userName = req.body.userName;
    console.log("Product name: ", userName);

    //2: Get product details from db by using id
    console.log('User fetched:', users);
    users.findOne({username: userName} ).exec(function(err, user) {
        if (err) {
            console.log('Error while getting a user from DB');
        } else {
            console.log('User fetched:', user);
            //3: Check if the product exists
            if (!user) {
                console.log('User is not there');
                res.render('popup', {title: 'User does not exist'});
            }
            else {
                //4: Check if product is already removed
                if (user.isDeleted === true) {
                    console.log('User is already deleted');
                    res.render('popup', {title: 'User is already deleted'});
                }
                else {
                    console.log('User is exists');
                    //4: Pass product to view (userProfile.pug)
                    res.render(path.join(__dirname,'./../views/userProfile.pug'), {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email ,
                        userRole: user.userRole,
                    });
                }

            }
        };
    });
});

router.post('/delete', function(req, res, next) {
    //Todo:
    //1: Get id from request
    var email = req.body.email;
    console.log("User email: ", email);
    //2: Delete product details from db by using id
    users.update({email: email}, {isDeleted:true}, function(err, row){
        if (err) {
            console.log('Error while deleting a user from DB');
        } else {
            console.log('User is deleted');
            //3: Return to main page
            res.render('admin', { title: 'Real Time Auction' });
            //});
        };}
    )
});
module.exports = router;




