var express = require('express');
var router = express.Router();
var productController = require('./controllers/productController')

// get all Products in collection
router.get('/getAll',function (req,res,next) {
    let resultArray=[];
    mongo.connect(url,function (err,db) {
        assert.equal(null,err);
        let cursor=db.collection(collections.product).find();
        cursor.forEach(function (doc,err) {
            assert.equal(null,err);
            resultArray.push(doc);
        }, function () {
            db.close();
            res.render('products',{items:resultArray});
        });
    });
});

//get one product
router.get('/get', function (req, res, next) {

});

//insert single product
router.post('/insert', function (req,res,next) {
    //assign data to object
    let status = productController.product.insert(req);
    if(status === 'Success')
//        res.redirect('/')
console.log('inserted Product');
        else
        console.log('inserted Product failed');
            //showError
});

// edit product
router.post('/update', function (req, res, next) {
    let product=new product(req.body.name, req.body.description, req.body.image, req.body.minPrice,req.body.userId,req.body.isActive,req.body.isDeleted)
    var id= req.body.id;
    mongo.connect(url,function (err, db) {
        assert.equal(null, err);
        db.collection(collections.product).updateOne({"_id": objectId(id)}, {$set: product}, function (err, result){
            assert.equal(nll,err);
            console.log('Item updated');
            db.close();
        });
    });
});

// delete product
router.post('/delete', function(req, res, next) {
    var id = req.body.id;
    mongo.connect(url, function(err, db) {
        assert.equal(null, err);
        db.collection(collections.product).deleteOne({"_id": objectId(id)}, function(err, result) {
            assert.equal(null, err);
            console.log('Item deleted');
            db.close();
        });
    });
});

module.exports = router;
