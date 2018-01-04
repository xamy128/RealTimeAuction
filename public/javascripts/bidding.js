//Open connection
let socket = io.connect('http://localhost:3000');
            let amount = $('#amount')[0];
            let bidButton = $('#bid')[0];
            let highestBid = $('h6')[0];
            let bidStartDate = $('#BidStartDate')[0];
            let bidEndDate = $('#BidEndDate')[0];
            let ProductId = $('#ProductId')[0];
            let MinBidAmount = $('#amount')[0];

//Receive data from server and display
            socket.on('message', function (data) {
                if(data.message) {                
                    highestBid.innerHTML = "The highest bid is " + data.message +' €';
                    }
                    else {
                    alert("Something went wrong.\nThe inconvenience caused is deeply regretted :(1s");
                }
            });
//Close connection
            socket.on('close', function(data){
                if(!data.message){
                    alert("Something went wrong.\nThe inconvenience caused is deeply regretted :(2");                
                }

            });
//On click of Bid send data to server
            bidButton.onclick = function() {
                let data = {
                    bidAmount : parseInt(amount.value),
                    productId:ProductId.value,
                    minBidAmount: parseInt(MinBidAmount.placeholder),
                    bidderId: BidderId.value
                };
                socket.emit('send', data);
            };