require('../config/db');

// product Schema

  let Product = new Schema({
//id: { type: int, required: true, unique: true },
id: int,
      name: String,
    description: String,
    image: String,
    minPrice: String,
    userId: int,
    bidderId: int,
    isActive: Boolean,
    isDeleted: Boolean,
    isBidComplete: Boolean,
    maxBidAmount: int,
    bidStartDate: Date,
    bidEndDate: Date
  });


var exports = module.exports = mongoose.model(collections.product, productSchema);
