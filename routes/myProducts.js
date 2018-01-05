const express = require('express');
const productsModel = require('../server/models/productModel');
const router = express.Router();
const productLimit = 30;

/* GET  my products and my bids page. */
router.get('/', function (req, res, next) {
    let title = "";
    let query= {};
    if (req.session.userRole.toUpperCase() === "SUPPLIER") {
       title =  "My Products";
       query = {
            supplierId: req.session.userId,
            isDeleted: {$ne: true}
        };
    }

    else {
        title= "My bids";
        query  = {
            bidderId: req.session.userId,
            isDeleted: {$ne: true}
        }
    }


    productsModel.find(query)
        .sort({'BidEndDate': 1})
        .limit(productLimit)
        .exec((err, productsList) => {
            if (err) return console.error(err);

            res.render('myProducts', {
                productsList: productsList,
                title: title,
            });
        });

});


module.exports = router;