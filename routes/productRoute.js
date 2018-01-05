/**
 * @file product router: for all get and post requests related to products
 * @author Ammarah Shakeel
 */

var express = require('express');
var router = express.Router();
var Product = require('../server/models/productModel');
//var fs = require('fs');
var multer = require('multer');

// setup for file upload
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
    Product
        .find(function(err, pro) {
            if (err)
                return error;
            else
                res.render('index',{"pro":pro})
        });
});

//get one product
router.get('/get', function (req, res, next) {
    let id = req.query.productId;

    Product.findOne({_id:id}, function(err,pro) {
        if (err)
            return error;
        else {
            let product= pro._doc;
            if(product.image=="")
                image = '/images/product.png';
            else
                image ='/uploads/'+product.image;
            product.image = image;
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
    let imageName = "";

    if(req.files.length!==0)
        imageName =req.files[0].filename;
    product = new Product({
        name: req.body.name,
        description: req.body.description,
        image: imageName,
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

// update product
router.post('/update', upload.any(),function (req, res, next) {
    let id = req.body.pro_id;
    Product.findById(id, function(err, doc) {
        if (err) {
            console.error('error, no entry found');
            return false;
        }
        doc.name = req.body.name;
        doc.description = req.body.description;
        if(req.files.length !== 0)
            doc.image = req.files[0].filename;
        doc.minPrice = req.body.min_price;
        doc.modifiedDate = Date.now();
        //doc.bidderId = bidderId;
        //doc.isActive = isActive;
        //doc.isDeleted = isDeleted;
        //doc.isBidComplete = isBidComplete;
        //doc.maxBidAmount = maxBidAmount;
        doc.bidStartDate = req.body.bidStartDate;
        doc.bidEndDate = req.body.bidEndDate;
        doc.modifiedDate = Date.now();
        doc.save(function (err, updateProduct) {
            if (err)
                return (err);
        });
        res.redirect("/");
    });
});

// delete product
router.post('/delete', function(req, res, next) {
    let id = req.body._id;
    Product.findByIdAndRemove(id)
        .exec(function (err) {
            if(err)
                console;
            else
                return true;
        });

});

//upload file
router.post('/upload', upload.any(), function (req, res) {
    res.send(req.files);
});

module.exports = router;