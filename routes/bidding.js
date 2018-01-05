/**
 * @file Bidding logic on product page
 * @author A. Kaul
 */
let socketIo = require('socket.io');
let productsModel = require('./../server/models/productModel');
let highestBid = 0;
module.exports = function(app, server){
    let io = socketIo.listen(server);
//Socket code for bidding

    io.sockets.on('connection', function (socket) {
    socket.on('send', function (data) {
//Get highest bid and compare with current if current is more replace in DB 
          if((data.bidAmount > highestBid) && (data.bidAmount > data.minBidAmount)){
            highestBid = data.bidAmount;
            productsModel.findOne({'_id': data.productId}, (err, docs) => {
                if(err){
                    throw err;
                }if(docs){
                    if(docs.IsBidCompleted === false){
                        docs.maxBidAmount = highestBid;
                        docs.bidderId = data.bidderId;
                    docs.save((err, updatedDocs) => {
                        if(err)
                            throw err;
                    })}
                }
            })
          }         
        let outData = {
            message: highestBid > 0 ? highestBid.toString() : data.minBidAmount.toString()
        };
          io.sockets.emit('message', outData);
      });
    });
};