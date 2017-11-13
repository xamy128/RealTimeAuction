let Product = require('../utils/productModel');

exports.products = {
insert : function insertProduct(req){

    product = new Product(req.body.product);
    product.save(function (err) {
        if(err) return err;
        else return 'Success';
    });

}
}

/*module.exports = {
    insert: func//,
    //bar: bar
};*/
