//product model object
function product(id, name, description, image, minPrice, userId,
                 bidderId, isActive, isDeleted, isBidComplete,
                 maxBidAmount, bidStartDate, bidEndDate){
    //this.id=id;
    this.name = name;
    this.description = description;
    this.image = image;
    this.minPrice = minPrice;
    this.userId = userId;
    this.bidderId = bidderId;
    this.isActive = isActive;
    this.isDeleted = isDeleted;
    this.isBidComplete = isBidComplete;
    this.maxBidAmount = maxBidAmount;
    this.bidStartDate = bidStartDate;
    this.bidEndDate = bidEndDate;
}

let collections={
    user: "user",
    product: "product",
    bid: "bid"
}
module.export = collections;