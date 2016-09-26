jQuery(document).ready(function() {

    /*
        send form to google form
    */
    $('.submit-form').on('submit', function(e) {
      // postToGoogle();
      // return false;
          var field1 = document.getElementById("Purchaser").value;
          var field2 = document.getElementById("Receiver").value;
          var field3 = document.getElementById("Email").value;
          msg = '姓名: ' + field1 + '\n' +
                '地址: ' + field2 + '\n' + 
                '電話: ' + field3 + '\n'
          swal({
               title: "訂單確認",
               text: msg,
               type: "warning",
               showCancelButton: true,
               confirmButtonClass: "btn-danger",
               confirmButtonText: "確認",
               cancelButtonText: "取消",
               closeOnConfirm: false,
               closeOnCancel: false,
               showLoaderOnConfirm: true
           }, function(isConfirm) {
               if (isConfirm) {
                  setTimeout(function () {
                       postToGoogle();
                   }, 2000);
               } else {
                  swal("Cancelled", "", "error");
               }
           });
          return false;
    });

    function postToGoogle() {
               var field1 = document.getElementById("Purchaser").value;
               var field2 = document.getElementById("Receiver").value;
               var field3 = document.getElementById("Email").value;
               // console.log(field1)
               // console.log(field2)
               // console.log(field3)
               $.ajax({
                   url: "https://docs.google.com/forms/d/e/1FAIpQLScioIA59ZN71aZmmeMElf3u42nd82Di5K-YREifDJ3EVq2QFw/formResponse",
                   data: {"entry.473890833": field1, "entry.1581381411": field2, "entry.1174023174": field3},
                   type: "POST",
                   //dataType: "xml",
                   statusCode: {
                       0: function() {
                           console.log("successful")
                           success = field1 + '先生/小姐' + '\n'+ '感 謝 您 的 訂 購!'
                                     + '訂購資訊:' + '\n' + field2 + field3
                           //alert(success);
                          swal({
                               title: "感 謝 您 的 訂 購!",
                               text: "",
                               type: "success",
                               closeOnConfirm: false,
                           }, function (){
                               window.location.reload(true);
                           });
                           //window.location.reload()
                           //Success message
                       },
                       200: function() {
                           console.log("failed")
                           swal({
                                title: "訂 購 失 敗!",
                                text: "",
                                type: "error",
                                closeOnConfirm: false,
                            }, function (){
                                window.location.replace("#contact");
                            });
                           //alert('訂 購 失 敗!');
                           //Success Message
                       }
                   }
               });
           }
});