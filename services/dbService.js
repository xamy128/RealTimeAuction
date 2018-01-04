let Product = require('../server/models/products');

// to insert product
exports.products = {
    insert : function insertProduct(req){
        ff = req.body.name;
        product = new Product({
     name: req.body.name,
            description: req.body.description,
image: req.files.filename,
            bidStartDate: req.body.bidStartDate,
            bidEndDate: req.body.bidEndDate,
            minPrice: req.body.amount
        });
        product.save(function (err) {
            if(err)
                return err;
            else return 'Success';
        });
    },

    //get all products
    getAll: function getAllProducts(){
        return Product
            .find({})
        //  .desc('created_at') // sort by date
    },

    //get single product
    getProduct: function getProduct(req) {
        let item_id = req.query.item_id;
        let products = req.query.pro_id;
        let ii = products[item_id];
        let ff;
        try {
       ff = Product.findOne({_id:ii});
        }
        catch (e)
        {
let err = e;
        }
        return ff;
    },

    //edit product
    updateProduct: function updateProduct(req) {
        let id = req.quer;

        Product.findById(id, function(err, doc) {
            if (err) {
                console.error('error, no entry found');
                return false;
            }
            doc.name = req.body.name;
            doc.description = req.body.description;
            doc.image = req.body.image;
            doc.minPrice = req.body.minPrice;
            //doc.userId = userId;
            //doc.bidderId = bidderId;
            //doc.isActive = isActive;
            //doc.isDeleted = isDeleted;
            //doc.isBidComplete = isBidComplete;
            //doc.maxBidAmount = maxBidAmount;
            doc.bidStartDate = req.body.bidStartDate;
            doc.bidEndDate = req.body.bidEndDate;
            doc.modifiedDate = Date.now();
            doc.save();
            return true;
        })
    },

    //delete product
    deleteProduct: function deleteProduct(req) {
        let id = req.body._id;
        Product.findByIdAndRemove(id)
            .exec(function (err) {
                if(err)
                    return false;
                else
                    return true;
            });
    }
}

