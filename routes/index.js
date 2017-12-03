const express = require('express');
const connection = require('../config/db.js');
const products = require('./products');
const router = express.Router();

const CallAll = function (cb) {
    products.Future((futureProductList) => {
        products.Current((currentProductList) => {
            products.Past((pastProductList) => {
                cb(futureProductList, currentProductList, pastProductList);
            });
        });
    });
};

/* GET home page. */
router.get('/', function (req, res, next) {

    CallAll((futureProductList, currentProductList, pastProductList) => res.render('index', {
        future: futureProductList,
        current: currentProductList,
        past: pastProductList
    }));
});

module.exports = router;