var express = require('express');
const productsModel = require('../config/productsModel.js');
const router = express.Router();
const productLimit = 3;

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
            BidStartDate: {$gt: new Date()}
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
            BidEndDate: {$lte: new Date()}
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
            BidStartDate: {$lte: new Date()}
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

module.exports = Products;