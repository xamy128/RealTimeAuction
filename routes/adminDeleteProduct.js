/**
 * @file Delete the selected product from the db
 * @author S Susan
 */

let express = require('express');
let router = express.Router();
let user = require('./../server/models/productModel');

router.post('/', function(req, res, next) {
    //Todo:
    //1: Get id from request
    let id = req.query.id;

    //2: Delete product details from db by using id
    products.update({_id: id}, {IsDeleted:true}, function(err, row){
        if (err) {
            console.log('Error while deleting a product from DB');
        } else {
            console.log('Product is deleted:');
            //3: Return to main page
            res.render('admin', {title: 'Welcome admin'});
            //});
        };}
    )
});
module.exports = router;