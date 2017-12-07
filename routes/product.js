var express = require('express');
const router = express.Router();
const productLimit = 3;

router.get('/', function(req, res, next) {
    res.render('product');
});

router.post('/product', function(req, res, next) {
    //TODO:

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
});
module.exports = router;