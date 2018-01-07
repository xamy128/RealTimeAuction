
/**
 * @file Front end socket logic for bidding page
 * @author A. Kaul, A. Ahmed
 */

 //Open connection
let socket = io.connect('http://localhost:3000');
            let amount = $('#amount')[0];
            let bidButton = $('#bid')[0];
            let highestBid = $('h6')[0];
            let bidStartDate = $('#BidStartDate')[0];
            let bidEndDate = $('#BidEndDate')[0];
            let userRole = $('#UserRole')[0];
            let ProductId = $('#ProductId')[0];
            let MinBidAmount = $('#amount')[0];
            let Today = new Date();
            let StartTime = $('#Start')[0].value
            let EndTime = $('#End')[0].value

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
// Disable bid button when not required
            (function(){    
                Today = Today.toUTCString();
                if(userRole.value.toUpperCase() === "SUPPLIER" || !(new Date(StartTime).toUTCString() < Today && new Date(EndTime).toUTCString() > Today)){   
                    $('#bid').attr('disabled', 'true');
                    $('h6').append('<p><strong><font color="red">The auction is not active!</font></strong></p>')
                };  
            })();


            $(document).ready(function () {
                setActions();
            });
            
            function setActions() {
                $('.accordion').find('.accordion-toggle').on("click", function(e) {
                    e.stopImmediatePropagation();
                    $(this).next(".reply-section").slideToggle();
                    //$(this).nextAll(".reply").slideToggle();
                    //$(".accordion-content").not($(this).next()).slideUp('600');
                });
                $('.accordion-toggle').on('click', function() {
                    $(this).toggleClass('active').siblings().removeClass('active');
                });
            }
            function makeid() {
                var text = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            
                for (var i = 0; i < 5; i++)
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                //console.log('text: ', text);
                return text;
            }
            
            function validateMyForm(id, parentId) {
                var reply = $("#"+id).val();
                var prodID = window.location.href.split("pid=")[1];
                var messge = {
                    "BidderId": 1,
                    "Comment": reply,
                    "parentId": parentId,
                    "comentId": id,
                    "productId": prodID
                };
            
                socket.emit('chat message', messge);
            
                //Also append this new reply to the chain of replies
                var replySection = $("#"+id).parent();
                var replyHtml = "<div class='reply'>" +
                    messge.Comment +
                    "</div>";
                replySection.append(replyHtml);
                $("#"+id).val("");
                //$("#"+id).attr("id", makeid());
            }
            $("#formoid").submit(function(e) {
            
                /* stop form from submitting normally */
                e.preventDefault();
            
            
                return false;
            
            });
            window.onload = function() {
            
                socket = io();
                //var socket = io('http://localhost:3000');
            
            
                var sendButton = document.getElementById("send");
                ///var content = document.getElementById("content");
            
                socket.on('FromServer', function(msg){
                    //console.log('new message received ', msg);
                });
            
                var prodID = window.location.href.split("pid=")[1];
            
                //Send fetch comments request to load all comments under the current PRODUCT iD
                socket.emit('chat comments', prodID);
            
                //Receive all comments filtered for the current ID
                socket.on("chat fetchcomments", function(data){
                    //console.log(data);
                    for(var i=0; i<data.length; i++){
                        if(data[i].parentId){
                            continue;
                        }
                        var comment = data[i].message;
                        var commentId = data[i].commentId;
                        var newId = makeid();
                        //console.log(newId);
                        var htmlStr =  '<h4 class="accordion-toggle">' +  comment+ '</h4>' +
                            '<div class="reply-section">' +
                            '' +
                            '  <input type="text" name="reply" id='+ newId +' placeholder="Type your replies here..." class="comment-box">' +
                            '  <input type="button" onclick="validateMyForm(\''+newId+'\', \''+commentId+'\')" value="send" class="send-btn">\n';
                        for(var j=0; j<data.length; j++){
                            if(commentId && (data[j].parentId == commentId)){
                                htmlStr += "<div class='reply'>" +
                                    data[j].message +
                                    "</div>";
                            }
                        }
                        htmlStr += "</div>";
                        $('#accordion').append(htmlStr);
                    }
                    var newId = makeid();
                    var footerHtml = "";
                    footerHtml = "<div id='commentFooter'>" +
                        '<input type="text" id="'+newId+'" placeholder="Type your comments here..." class="comment-box">\n' +
                        '<input type="button" onclick="addComments(\''+newId+'\')" value="Send" class="send-btn"/>' +
                        "</div>";
                    $('#accordion').append(footerHtml);
            
                    setActions();
                });
            
            
                //Add a new comment under the product
                addComments = function(newId) {
            
                    var bidderId =1;// document.getElementById("bidderId").value;
                    var comment = document.getElementById(newId).value;
                    document.getElementById(newId).value = "";
                    var commentId = newId;
                    // alert(comment);
                    var prodID = window.location.href.split("pid=")[1];
                    var messge = {
                        "BidderId": bidderId,
                        "Comment": comment,
                        "productId": prodID,
                        "commentId": newId
                    };
                    // console.log('onclick :' ,messge);
                    socket.emit('chat message', messge);
                    var newId = makeid();
                    //console.log(newId);
                    $('#accordion').append('<h4 class="accordion-toggle">' +  comment+ '</h4>' +
                        '<div class="reply-section">' +
                        '' +
                        '  <input type="text" name="reply" id='+ newId +' placeholder="Type your replies here..." class="comment-box">' +
                        '  <input type="button" onclick="validateMyForm(\''+newId+'\', \''+commentId+'\')" value="send" class="send-btn">\n' +
                        '</div>' +
                        '');
                    $("#commentFooter").remove();
                    var newId = makeid();
                    var footerHtml = "";
                    footerHtml = "<div id='commentFooter'>" +
                        '<input type="text" id="'+newId+'" placeholder="Type your comments here..." class="comment-box">\n' +
                        '<input type="button" onclick="addComments(\''+newId+'\')" value="Send" class="send-btn"/>' +
                        "</div>";
                    $('#accordion').append(footerHtml);
                    setActions();
                };
            
            
            }