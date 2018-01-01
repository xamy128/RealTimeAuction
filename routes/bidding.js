/**
 * @file Bidding logic on product page
 * @author A. Kaul
 */
module.exports = function(app, server){
    let socketIo = require('socket.io');
    const productLimit = 3;
    let io = socketIo.listen(server);
    let highestBid = 0;

    //Get product from product id
    productsModel.findOne({
        BidEndDate: {$gt: new Date()},
        BidStartDate: {$lte: new Date()}
    })
        .sort({'BidEndDate': 1})
        .limit(productLimit)
        .exec((err, productList) => {
            if (err) return console.error(err);
            //console.log(user.toString());
            cb(productList);
        });

        //Socket code
    io.sockets.on('connection', function (socket) {
      socket.on('send', function (data) {
          if(parseInt(data.message) > highestBid)
            highestBid = parseInt(data.message);
        let outData = {
            message: highestBid.toString()
        };
          //Get highest bid from DB and compare with current if current is more replace in DB
        console.log(data);
        console.log(outData);
          io.sockets.emit('message', outData);
      });
    });
};

