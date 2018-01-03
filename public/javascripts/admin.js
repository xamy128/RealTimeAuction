/**
 * @file Admin Edit and Delete
 * @author S Susan
 */


$(document).ready(function  () {
    $("#result").html('');
   // alert('i am ready function');
    $("#searchProduct").on("submit",function  (e) {
        e.preventDefault();
        $("#result").html('');
        console.log('submit by ajax request');
        $.post("/admin/searchProduct",$(this).serialize(), function( data ) {

            if(data.result === "f"){
                alert(data.message);
            }
            else
                if(data.result === "t"){
                    //window.location.assign("/admin/searchProduct/")
                    $("#result").html('Prodcut is exist : ' + data.ProductName + '<a href=/admin/GoToDetails?id='+data.Id+'> click here for details </a>');
                }
            console.log(data);
        });
    })
    $("#userProfile").on("submit",function  (e) {
        e.preventDefault();
        $("#result").html('');
        console.log('submit by ajax request');
        $.post("/admin/userProfile",$(this).serialize(), function( data ) {

            if(data.result === "f"){
                alert(data.message);
            }
            else
            if(data.result === "t"){
                //window.location.assign("/admin/searchProduct/")
                $("#UserResult").html('User is exist : ' + data.UserName + '<a href=/admin/GoToUserDetails?id='+data.Id+'> click here for details </a>');
            }
            console.log(data);
        });
    })
    $("#SuserProfile").on("submit",function  (e) {
        e.preventDefault();
        $("#result").html('');
        console.log('submit by ajax request');
        $.post("/admin/userProfile",$(this).serialize(), function( data ) {

            if(data.result === "f"){
                alert(data.message);
            }
            else
            if(data.result === "t"){
                //window.location.assign("/admin/searchProduct/")
                $("#SUserResult").html('User is exist : ' + data.UserName + '<a href=/admin/GoToUserDetails?id='+data.Id+'> click here for details </a>');
            }
            console.log(data);
        });
    })
});