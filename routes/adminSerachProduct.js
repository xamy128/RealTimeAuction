/**
 * @file Search the product in db
 * @author S Susan
 */

let express = require('express');
let router = express.Router();
let products = require('./../server/models/products');


router.post('/', function(req, res, next) {
    //Todo:
    //1: Get productname from request
    let name = req.body.productName;
    console.log("Product name: ", name);

    //2: Get product details from db by using id
    products.findOne({ProductName: name} ).exec(function(err, product) {
        if (err) {
            console.log('Error while getting a product from DB');
        } else {
            console.log('Product fetched:', product)
            //3: Check if the product exists
            if (!product){
                console.log('Product is not there');
                //res.render('popup', {title: 'Product does not exist'});
                res.send({result: "f", message : "Product does not exist"});

            }
            else{
                //4: Check if product is already removed
                if ( product.IsDeleted === true  ){
                    console.log('Product is already deleted');
                    //res.render('popup', {title: 'Product is already deleted'});
                    res.send({result: "f", message : "Product is already deleted"});
                }
                else{
                    console.log('Product is exists');
                    //4: Pass product to view (searchProduct.pug)
                    //res.render('searchProduct', { title: product.ProductName + ' page', data: product });
                    res.send({result: "t", message : "Product is exist", ProductName: product.ProductName, Id: product._id });
                }

            }
        };
    });

});

module.exports = router;