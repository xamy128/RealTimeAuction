/**
 * @file Product page
 * @author A. Kaul
 */
let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let path = require('path');
let socketIo = require('socket.io');
let productsModel = require('./../server/models/products');
let baseURL = 'http://localhost:3000';

router.get('/', function(req, res, next) {
//Get product id from query string
        productId = req.query.pid;

//Get product details from DB and render page
        productsModel.findOne({'_id': productId}, (err, docs) => {
            if(err){
                throw err;
            }if(docs){
//If user role is not bidder edit and delete functionality is to be provided
                if(req.session.userRole.toUpperCase() === "SUPPLIER"){
                    res.render(path.join(__dirname, './../views/productAdmin.pug'), {
                        ProductName: docs.ProductName,
                        ProductDescription: docs.ProductDescription,
                        ProductImage: baseURL+docs.ProductImage,
                        ProductBidStartDate: docs.BidStartDate,
                        ProductBidEndDate : docs.BidEndDate,
                        ProductId: productId
                    });
                }
                res.render(path.join(__dirname, './../views/bidding.pug'), {
                    ProductName: docs.ProductName,
                    ProductDescription: docs.ProductDescription,
                    ProductImage: baseURL+docs.ProductImage,
                    ProductBidStartDate: docs.BidStartDate,
                    ProductBidEndDate : docs.BidEndDate,
                    MinBidAmount: docs.ProductMinPrice,
                    ProductId: productId,
                    BidderId: req.session.userId
                });
            }
        })
    });
    module.exports = router;