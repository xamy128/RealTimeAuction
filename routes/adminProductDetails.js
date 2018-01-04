/**
 * @file Goto the details of the product if it exists
 * @author S Susan
 */

let express = require('express');
let router = express.Router();
let path = require('path');
let products = require('./../server/models/products');
let baseURL = 'http://localhost:3000';

router.get('/', function(req, res, next) {
    let id  = req.query.id;
    console.log('Product id ', id);
    products.findOne({'_id': id} ).exec(function(err, product) {
        if (err) {
            console.log('Error while getting a product from DB');
        } else {
            res.render(path.join(__dirname, './../views/productAdmin.pug'), {
                ProductName: product.ProductName,
                ProductDescription: product.ProductDescription,
                ProductImage: baseURL+product.ProductImage,
                ProductBidStartDate: product.BidStartDate,
                ProductBidEndDate : product.BidEndDate,
                ProductId: id
            });
        }
    });

});

module.exports = router;