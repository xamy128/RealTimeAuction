var express = require('express');
const productsModel = require('../config/productsModel.js');
const router = express.Router();


class Products {

    static All(cb) {
        productsModel.find({},
            function (err, productList) {
                if (err) return console.error(err);
                //console.log(user.toString());
                cb(productList);
            });
    }

    static Future(cb) {
        productsModel.find({
            BidStartDate: {$gt: new Date()}
        })
            .sort({'BidStartDate': 1})
            .limit(20)
            .exec((err, productList) => {
                if (err) return console.error(err);
                //console.log(user.toString());
                cb(productList);
            });
    }

    static Past(cb) {
        productsModel.find({
            BidEndDate: {$lte: new Date()}
        })
            .sort({'BidEndDate': -1})
            .limit(20)
            .exec((err, productList) => {
                if (err) return console.error(err);
                //console.log(user.toString());
                cb(productList);
            });
    }

    static Current(cb) {
        productsModel.find({
            BidEndDate: {$gt: new Date()},
            BidStartDate: {$lte: new Date()}
        })
            .sort({'BidEndDate': 1})
            .limit(20)
            .exec((err, productList) => {
                if (err) return console.error(err);
                //console.log(user.toString());
                cb(productList);
            });
    }
}

module.exports = Products;