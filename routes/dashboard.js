/**
 * @file fetch product to show in dashboard
 * @author F. Rahmati
 */
const express = require('express');
const productsModel = require('../server/models/productModel');
const router = express.Router();
const productLimit = 30;

function future(cb) {
    productsModel.find({
        bidStartDate: {$gt: new Date()},
        isDeleted: {$ne: true}
    })
        .sort({'BidStartDate': 1})
        .limit(productLimit)
        .exec((err, productList) => {
            if (err) return console.error(err);
            cb(productList);
        });
}

function past(cb) {
    productsModel.find({
        bidEndDate: {$lte: new Date()},
        isDeleted: {$ne: true}
    })
        .sort({'BidEndDate': -1})
        .limit(productLimit)
        .exec((err, productList) => {
            if (err) return console.error(err);
            cb(productList);
        });
}

function current(cb) {
    productsModel.find({
        bidEndDate: {$gt: new Date()},
        bidStartDate: {$lte: new Date()},
        isDeleted: {$ne: true}
    })
        .sort({'BidEndDate': 1})
        .limit(productLimit)
        .exec((err, productList) => {
            if (err) return console.error(err);
            cb(productList);
        });
}
/*In this function we have tree nested call back functions because
at the rendering time of the dashboard all future, past and current product should be available*/
const callAll = function (cb) {
    future((FutureProductList) => {
        current((CurrentProductList) => {
            past((PastProductList) => {
                cb(FutureProductList, CurrentProductList, PastProductList);
            });
        });
    });
};

/* GET Dashboard page. */
router.get('/', function (req, res, next) {

    callAll((FutureProductList, CurrentProductList, PastProductList) => res.render('dashboard', {
        futureProducts: FutureProductList,
        currentProducts: CurrentProductList,
        pastProducts: PastProductList
    }));
});

module.exports = router;