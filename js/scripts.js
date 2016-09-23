jQuery(document).ready(function() {

    /*
        send form to google form
    */
    $('.submit-form').on('submit', function(e) {
      postToGoogle();
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
                           alert('感 謝 您 的 訂 購!');
                           //Success message
                       },
                       200: function() {
                           console.log("failed")
                           alert('訂 購 失 敗!');
                           //Success Message
                       }
                   }
               });
           }
});