/**
 * @file Bidding logic on product page
 * @author A. Kaul, A. Ahmed
 */
let socketIo = require('socket.io');
let productsModel = require('./../server/models/productModel');
let commentModel = require('./../server/models/commentModel');
let highestBid = 0;
let bidderId = "";
module.exports = function(app, server){
    let io = socketIo.listen(server);
//Socket code for bidding

    io.sockets.on('connection', function (socket) {
    socket.on('send', function (data) {
//Get highest bid and compare with current if current is more replace in DB 
          if((data.bidAmount > highestBid) && (data.bidAmount > data.minBidAmount)){
            highestBid = data.bidAmount;
            bidderId = data.bidderId;
            productsModel.findByIdAndUpdate(data.productId,{$set:{'maxBidAmount':highestBid,'bidderId':bidderId}}, (err, docs) => {
                if(err){
                    throw err;
                }
                if(docs){
                    //Do Nothing
                }
            })
          }         
        let outData = {
            message: highestBid > 0 ? highestBid.toString() : data.minBidAmount.toString()
        };
          io.sockets.emit('message', outData);
      });

        //Fetch comments from the DB for a product
        socket.on('chat comments', function(prodId){
            // var commentsModel = mongoose.model("Comment");
            //console.log("Fetching comments for product "+prodId);
            commentModel.find(
            {
                productId : prodId
            }
            , function(err, data){
                //console.log("Comments data : \n");
                //console.log(data);
                socket.emit("chat fetchcomments", data);
            });
        });

        //Receives a comment message from the bidder and saves in the DB
        socket.on('chat message', function(msg){
            //console.log('message from client: ', msg);
            //comment
            var comment = msg.Comment;
            var productId= msg.productId;
            //From which bidder
            var bidderId = msg.BidderId;
            //console.log("bidderId ",bidderId);
            var parentId = msg.parentId;
            //To which supplier

            var newComment = new commentModel({
                commentId : msg.commentId,
                createdDate : '29-12-2017',
                bidderId : '1',
                userId : '1',
                message : comment,
                productId: productId,
                parentId: parentId
            });

            //Save message in DB
            newComment.save(function (err) {
                if (err) {
                    //console.log("Error while inserting comment: ", err);
                }
                else
                {
                    //console.log("a new comment saved")
                }
            });
            //Send to other side
            io.sockets.emit('FromServer', msg);
        });


    });
};