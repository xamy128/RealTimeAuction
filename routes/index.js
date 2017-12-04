const express = require('express');
const connection = require('../config/db.js');
const products = require('./products');
const router = express.Router();

const callAll = function (cb) {
    products.future((FutureProductList) => {
        products.current((CurrentProductList) => {
            products.past((PastProductList) => {
                cb(FutureProductList, CurrentProductList, PastProductList);
            });
        });
    });
};

/* GET home page. */
router.get('/', function (req, res, next) {
    callAll((FutureProductList, CurrentProductList, PastProductList) => res.render('index', {
        Future: FutureProductList,
        Current: CurrentProductList,
        Past: PastProductList
    }));
});

module.exports = router;