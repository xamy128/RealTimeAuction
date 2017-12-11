var express = require('express');
var router = express.Router();
var productController = require('../controllers/productController')
var Product = require('../models/product');
var fs = require('fs');
var multer = require('multer');
var storage = multer.diskStorage(
    {
        destination: '../public/uploads/',
        filename: function ( req, file, cb ) {
            //req.body is empty...
            //How could I get the new_file_name property sent from client here?
            cb( null, 'product'+ '-' + Date.now()+".jpg");
        }
    }
);
var upload = multer({storage})

//get All Products
router.get('/getAll', function (req,res,next) {
    let pro = productController.product.getAll();
    pro.exec(function(err, pro) {
        if (err)
            return error;
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
        else {
            let product= pro._doc;
            //let kk = pro.bidStartDate;
            let bitmap ='/uploads/'+product.image;
            product.image = bitmap;
            res.render('editProduct',{"pro":product})
        }
    });

});

router.get('/', function (req,res,next) {
    //assign data to object
    res.render('products')
});

//insert single product
router.post('/insert', upload.any(),function (req,res,next) {
//    let result = productController.product.insert(req);
//if(result=="Success")
    //  res.redirect("/")
    ff =req.files[0].filename;
    product = new Product({
        name: req.body.name,
        description: req.body.description,
        image: req.files[0].filename,
        bidStartDate: req.body.bidStartDate,
        bidEndDate: req.body.bidEndDate,
        minPrice: req.body.amount
    });
    product.save(function (err) {
        if(err)
            err;
        else
            res.redirect("/");
    });
});

// edit product
router.post('/update', function (req, res, next) {
    productController.product.updateProduct(req);
});

// delete product
router.post('/delete', function(req, res, next) {
    productController.product.deleteProduct(req);
});

//upload product
router.post('/upload', upload.any(), function (req, res) {
    res.send(req.files);
});

module.exports = router;