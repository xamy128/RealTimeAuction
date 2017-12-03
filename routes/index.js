var express = require('express');
var router = express.Router();
var renderer = require('vue-server-renderer').createRenderer();
var fs = require('fs');

var productController = require('../controllers/productController')
var Product = require('../models/product');


//var layout = fs.readFileSync('../views/hh.html','utf8');
/* GET home page. */
router.get('/', function(req, res, next) {
    let pro = productController.product.getAll();
    pro.exec(function(err, pro) {
        if (err)
            return error
        else

            res.render('index',{"pro":pro})
    });

});

// delete product
router.post('/delete', function(req, res, next) {
    productController.product.deleteProduct(req.body._id);
    let pro = productController.product.getAll();
    pro.exec(function(err, pro) {
        if (err)
            return error
        else

            res.render('index',{"pro":pro})

    });

});


//get one product
router.get('/get', function (req, res, next) {
    let pro = productController.product.getProduct(req);
    pro.exec(function(err, pro) {
        if (err)
            return error;
        else
            res.render('index',{"pro":pro})
    });

});


module.exports = router;
