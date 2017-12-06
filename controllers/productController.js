let service =require('../services/dbService')

// insert product
exports.product = {
    insert: function insertProduct(req){
        return service.products.insert(req)
    },

    //get all products
    getAll: function getAllProducts() {
        return  service.products.getAll()
    },

    //get single product
    getProduct: function getProduct(req) {
        return  service.products.getProduct(req);
    },

    // edit product
    updateProduct: function updateProduct(req) {
        return service.products.updateProduct(req);
    },

    // delete product
    deleteProduct: function deleteProduct(req) {
        return service.products.deleteProduct(req);
    }
}

