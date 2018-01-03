// /**
//  * @file Admin Edit and Delete
//  * @author S Susan
//  */
// let express = require('express');
// //let mongoose = require('mongoose');
// let router = express.Router();
// //let url = 'mongodb://admin:admin@ds249005.mlab.com:49005/pm102realtimeauction';
//
// //using local db for testing
// //url  = 'mongodb://localhost:27017/RealtimeAuction';
// let user = require('./../server/models/user');
//
//
// let path = require('path');
//
// //connecting to db
// // const db = mongoose.connect(url, {
// //     server: {
// //         socketOptions: {
// //             keepAlive: 1
// //         }
// //     }
// // }).connection;
// // db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//
// // Define schema
// //let Schema = mongoose.Schema;
//
// //Product
//
// //
// // let ProductSchema = new Schema({
// //     SupplierId : String,
// //     UserId : String,
// //     ProductId : String,
// //     ProductName : String,
// //     ProductDescription : String,
// //     ProductImage : String,
// //     ProductMinPrice : String,
// //     BidStartDate : String,
// //     BidEndDate : String,
// //     IsActive : String,
// //     IsDeleted : Boolean,
// //     IsBidCompleted : String,
// //     MaxBidAmount : String
// // });
// //
// // //User
// // let UserSchema = new Schema({
// //     username: String,
// //     password: String,
// //     firstName: String,
// //     lastName: String,
// //     email: String,
// //     userRole: String,
// //     isDeleted: Boolean
// // });
// //
// // // Compile model from schema
// // let ProductModel = mongoose.model('ProductModel', ProductSchema);
// //
// //
// // // Create an instance of model SomeModel
// // let Product1Model = new ProductModel({
// //     // SupplierId : '001',
// //     // UserId : 'user1',
// //     // ProductId : 'product1',
// //     // ProductName : 'shoe',
// //     // ProductDescription : 'it is a sports shoe',
// //     // ProductImage : '',
// //     // ProductMinPrice : '10euro',
// //     // BidStartDate : '20-11-2017',
// //     // BidEndDate : '23-11-2017',
// //     // IsActive : '',
// //     // IsDeleted : false,
// //     // IsBidCompleted : 'No',
// //     // MaxBidAmount : ''
// // });
//
// //let UserModel = mongoose.model('UserModel', UserSchema);
//
//
// // Create an instance of model SomeModel
// // let UserModel = new UserModel({
// //     // username: 'Simil',
// //     // password: '',
// //     // firstName: 'Simil',
// //     // lastName: 'Susan',
// //     // email: '',
// //     // userRole: '',
// //     // isDeleted: false
// // });
//
//
//
//
//
// // let products = mongoose.model('ProductModel', ProductSchema);
// //
// // let user = mongoose.model('UserModel', UserSchema);
//
//
//
// // router.get('/', function(req, res, next) {
// //     res.render('admin', { title: 'Real Time Auction' });
// // });
//
// //goto the details of the product if it exists
// router.post('/GoToDetails', function(req, res, next) {
//     let id  = req.query.id;
//     console.log('Product id ', id);
//     products.findOne({_id: id} ).exec(function(err, product) {
//         if (err) {
//             console.log('Error while getting a product from DB');
//         } else {
//
//             res.render('searchProduct', { title:product.ProductName + ' page', data: product });
//         }
//     });
//
// });
//
// //goto the details of the user if he/she exists
// router.post('/GoToUserDetails', function(req, res, next) {
//     let id  = req.query.id;
//     console.log('User id ', id);
//     user.findOne({_id: id} ).exec(function(err, user) {
//         if (err) {
//             console.log('Error while getting a product from DB');
//         } else {
//             console.log('User ', user);
//             res.render(path.join(__dirname, './../views/userProfile.pug'), {
//                 firstName: user.firstName,
//                 lastName: user.lastName,
//                 email: user.email,
//                 userRole: user.userRole,
//             });
//         }
//     })
// });
//
//
//
// //Functionality to search the product in db
// router.post('/searchProduct', function(req, res, next) {
//     //Todo:
//     //1: Get productname from request
//     let name = req.body.productName;
//     console.log("Product name: ", name);
//
//     //2: Get product details from db by using id
//     products.findOne({ProductName: name} ).exec(function(err, product) {
//         if (err) {
//             console.log('Error while getting a product from DB');
//         } else {
//             console.log('Product fetched:', product)
//             //3: Check if the product exists
//             if (!product){
//                 console.log('Product is not there');
//                 //res.render('popup', {title: 'Product does not exist'});
//                 res.send({result: "f", message : "Product does not exist"});
//
//             }
//             else{
//                 //4: Check if product is already removed
//                 if ( product.IsDeleted === true  ){
//                     console.log('Product is already deleted');
//                     //res.render('popup', {title: 'Product is already deleted'});
//                     res.send({result: "f", message : "Product is already deleted"});
//                 }
//                 else{
//                     console.log('Product is exists');
//                     //4: Pass product to view (searchProduct.pug)
//                     //res.render('searchProduct', { title: product.ProductName + ' page', data: product });
//                     res.send({result: "t", message : "Product is exist", ProductName: product.ProductName, Id: product._id });
//                 }
//
//             }
//         };
//     });
//
// });
//
// //delete the selected product from the db
// router.post('/DeleteProduct', function(req, res, next) {
//     //Todo:
//     //1: Get id from request
//     let id = req.query.id;
//     console.log("Product Id: ", id);
//     //2: Delete product details from db by using id
//     products.update({_id: id}, {IsDeleted:true}, function(err, row){
//         if (err) {
//             console.log('Error while deleting a product from DB');
//         } else {
//             console.log('Product is deleted:');
//             //3: Return to main page
//             res.render('admin', { title: 'Real Time Auction' });
//             //});
//         };}
//     )
// });
//
// // //looking for the user in the db
// // router.post('/userProfile', function(req, res, next) {
// //     //Todo:
// //     //1: Get username from request
// //     let userRole = "";
// //     let userName = req.body.userName;
// //     if(req.body.bidder){
// //         userRole = "bidder";
// //     }else {
// //         userRole = "supplier";
// //     }
// //     console.log(userRole);
// //     console.log("User name: ", userName);
// //     console.log('User db:', user);
// //     //2: Get product details from db by using id
// //     user.findOne({firstName: userName} ).exec(function(err, user) {
// //         if (err) {
// //             console.log('Error while getting a user from DB');
// //         } else {
// //             console.log('User fetched:', user);
// //             //3: Check if the user exists
// //             if (!user) {
// //                 console.log('User is not there');
// //                 res.send({result: "f", message : "User does not exist"});
// //             }
// //             else {
// //                 //4: Check if product is already removed
// //                 if (user.userRole !== userRole){
// //                     console.log('User is not a ', userRole);
// //                     res.send({result: "f", message : 'User is not a '+userRole});
// //                 }
// //                 else {
// //                     if (user.isDeleted === true) {
// //                         console.log('User is already deleted');
// //                         res.send({result: "f", message: 'User is already deleted'});
// //                     }
// //
// //                     else {
// //                         console.log('User is exists');
// //                         //4: Pass product to view (userProfile.pug)
// //                         res.send({result: "t", message: "User is exist", UserName: user.firstName, Id: user._id});
// //                     }
// //                 }
// //             }
// //         };
// //     });
// // });
//
// //delete the selected user from the db
// router.post('/DeleteUser', function(req, res, next) {
//     //Todo:
//     //1: Get id from request
//     let email = req.body.email;
//     console.log("User email: ", email);
//     //2: Delete product details from db by using id
//     user.update({email: req.body.email}, {isDeleted:true}, function(err, row){
//         if (err) {
//             console.log('Error while deleting a user from DB');
//         } else {
//             console.log('User is deleted');
//             //3: Return to main page
//             res.render('admin', { title: 'Real Time Auction' });
//             //});
//         };}
//     )
// });
// module.exports = router;
//
//
//
//
