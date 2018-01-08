/**
 * @file Product page
 * @author A. Kaul
 */
let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let path = require('path');
let socketIo = require('socket.io');
let productsModel = require('./../server/models/productModel');
let baseURL = 'http://localhost:3000/uploads/';

router.get('/', function(req, res, next) {
//Get product id from query string
        productId = req.query.pid;

//Get product details from DB and render page
        productsModel.findOne({'_id': productId}, (err, docs) => {
            if(err){
                throw err;
            }if(docs){
//If user role is not bidder edit and delete functionality is to be provided
                if((req.session.userRole.toUpperCase() === "SUPPLIER") && (docs.supplierId === req.session.userId)){
                    res.render(path.join(__dirname, './../views/productAdmin.pug'), {
                        ProductName: docs.name,
                        ProductDescription: docs.description,
                        ProductImage: baseURL+docs.image,
                        ProductBidStartDate: docs.bidStartDate,
                        ProductBidEndDate : docs.bidEndDate,
                        UserRole : req.session.userRole,
                        ProductId: productId
                    });
                }else{
                    res.render(path.join(__dirname, './../views/bidding.pug'), {
                        ProductName: docs.name,
                        ProductDescription: docs.description,
                        ProductImage: baseURL+docs.image,
                        ProductBidStartDate: docs.bidStartDate,
                        ProductBidEndDate : docs.bidEndDate,
                        MinBidAmount: docs.minPrice,
                        ProductId: productId,
                        UserRole : req.session.userRole,
                        BidderId: req.session.userId
                    });
                }
            }
        })            
    });
    module.exports = router;