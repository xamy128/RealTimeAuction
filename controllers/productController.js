let service =require('../services/dbService')

exports.product = {
insert: function insertProduct(req){
return service.products.insert(req)
}
}

