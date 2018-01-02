/**
 * @file fetch product to show in dashboard
 * @author F. Rahmati
 */
const express = require('express');
const productsModel = require('../server/models/products');
const router = express.Router();
const productLimit = 30;


class Products {

    static all(cb) {
        productsModel.find({},
            function (err, productList) {
                if (err) return console.error(err);
                //console.log(user.toString());
                cb(productList);
            });
    }

    static future(cb) {
        productsModel.find({
            BidStartDate: {$gt: new Date()},
            IsDeleted: {$ne: true}
        })
            .sort({'BidStartDate': 1})
            .limit(productLimit)
            .exec((err, productList) => {
                if (err) return console.error(err);
                //console.log(user.toString());
                cb(productList);
            });
    }

    static past(cb) {
        productsModel.find({
            BidEndDate: {$lte: new Date()},
            IsDeleted: {$ne: true}
        })
            .sort({'BidEndDate': -1})
            .limit(productLimit)
            .exec((err, productList) => {
                if (err) return console.error(err);
                //console.log(user.toString());
                cb(productList);
            });
    }

    static current(cb) {
        productsModel.find({
            BidEndDate: {$gt: new Date()},
            BidStartDate: {$lte: new Date()},
            IsDeleted: {$ne: true}
        })
            .sort({'BidEndDate': 1})
            .limit(productLimit)
            .exec((err, productList) => {
                if (err) return console.error(err);
                //console.log(user.toString());
                cb(productList);
            });
    }
}


const callAll = function (cb) {
    Products.future((FutureProductList) => {
        Products.current((CurrentProductList) => {
            Products.past((PastProductList) => {
                cb(FutureProductList, CurrentProductList, PastProductList);
            });
        });
    });
};

/* GET Dashboard page. */
router.get('/', function (req, res, next) {

    callAll((FutureProductList, CurrentProductList, PastProductList) => res.render('dashboard', {
        Future: FutureProductList,
        Current: CurrentProductList,
        Past: PastProductList
    }));
});

module.exports = router;