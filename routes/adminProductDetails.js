/**
 * @file Goto the details of the product if it exists
 * @author S Susan
 */

let express = require('express');
let router = express.Router();
let products = require('./../server/models/products');

router.post('/', function(req, res, next) {
    let id  = req.query.id;
    console.log('Product id ', id);
    products.findOne({_id: id} ).exec(function(err, product) {
        if (err) {
            console.log('Error while getting a product from DB');
        } else {

            res.render('searchProduct', { title:product.ProductName + ' page', data: product });
        }
    });

});

module.exports = router;