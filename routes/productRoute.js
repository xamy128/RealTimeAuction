/**
 * @file product router: for all get and post requests related to products
 * @author Ammarah Shakeel
 */

let express = require('express');
let router = express.Router();
let Product = require('../server/models/productModel');
let path = require('path');
let multer = require('multer');

// setup for file upload
let storage = multer.diskStorage(
    {
        destination: 'public/uploads/',

        filename: function ( req, file, cb ) {
            cb( null, 'product'+ '-' + Date.now()+".jpg");
        }
    }
);
let upload = multer({storage})

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
                product.image = '/images/product.png';
            else
                product.image ='/uploads/'+product.image;

            res.render('editProduct',{"pro":product})
        }
    });
});


router.get('/', function (req,res,next) {
    //assign data to object
    res.render('ProductView')
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
        supplierId: req.session.userId,
        bidStartDate: req.body.bidStartDate,
        bidEndDate: req.body.bidEndDate,
        minPrice: req.body.amount
    });
    product.save(function (err) {
        if(err)
            err;
        else
            res.redirect("/dashboard");
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
        doc.bidStartDate = req.body.bidStartDate;
        doc.bidEndDate = req.body.bidEndDate;
        doc.modifiedDate = Date.now();
        doc.save(function (err, updateProduct) {
            if (err)
                return (err);
        });

        if(req.session.userRole == 'admin')
            res.render(path.join(__dirname,'./../views/admin.pug'));
        else
            res.redirect("/dashboard");
    });
});

// delete product
router.post('/delete', function(req, res, next) {
    let id = req.body.productId;
    Product.findById(id, function(err, doc) {
        if (err) {
            console.error('error, no entry found');
            return false;
        }
        doc.isDeleted = true;
        doc.save(function (err, updateProduct) {
            if (err)
                return (err);
        });

        if(req.session.userRole == 'admin')
            res.render(path.join(__dirname,'./../views/admin.pug'));
        else
            res.redirect("/dashboard");
    });

});

//redirect on cancel
router.post('/redirect', function (req,res) {

    if(req.session.userRole == 'admin')
        res.render(path.join(__dirname,'./../views/admin.pug'));
    else
        res.redirect("/dashboard");
});

//upload file
router.post('/upload', upload.any(), function (req, res) {
    res.send(req.files);
});

module.exports = router;