var express = require('express');
const products = require('../config/productsModel.js');
var router = express.Router();


var AllProducts = function (cb) {
    products.find({},
        function (err, productList) {
            if (err) return console.error(err);
            //console.log(user.toString());
            cb(productList);
        });

}

var FutureProducts = function (cb) {
        products.find({
            BidStartDate: {$gt: new Date()}
        })
        .sort({'BidStartDate': 1})
        .limit(20)
        .exec(function (err, productList) {
            if (err) return console.error(err);
            //console.log(user.toString());
            cb(productList);
        });

}

var PastProducts = function (cb) {
    products.find({
            BidEndDate: {$lte: new Date()}
        },
        function (err, productList) {
            if (err) return console.error(err);
            //console.log(user.toString());
            cb(productList);
        });

}


var CurrentProducts = function (cb) {
    products.find({
            BidEndDate: {$gt: new Date()},
            BidStartDate: {$lte: new Date()}
        },
        function (err, productList) {
            if (err) return console.error(err);
            //console.log(user.toString());
            cb(productList);
        });

}

/* GET all Products listing. */
router.get('/all', function (req, res, next) {
    AllProducts(function (productList) {
        res.json(productList);
    });
});

/* GET future Products listing. */
router.get('/future', function (req, res, next) {
    FutureProducts((productList) => res.json(productList));
});

/* GET past Products listing. */
router.get('/past', function (req, res, next) {
    PastProducts((productList) => res.json(productList));
});

/* GET current Products listing. */
router.get('/current', function (req, res, next) {
    CurrentProducts((productList) => res.json(productList));
});

/* GET Products listing. */
router.get('/test', function (req, res, next) {

    products.find({},
        function (err, productList) {
            if (err) return console.error(err);
            //console.log(user.toString());
            res.json(productList);
        });

});

module.exports = router;