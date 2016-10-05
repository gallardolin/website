jQuery(document).ready(function() {

    /*
        send form to google form
    */
    $('#request').on('click', function (e) {
        $('.submit-form').show();
        $('.query-form').hide();
        return true;
    })
    $('#review').on('click', function (e) {
        $('.query-form').show();
        $('.submit-form').hide();
        return true;
    })

    $('.submit-form').on('submit', function(e) {
      // postToGoogle();
      // return false;
          var purchaser = document.getElementById("Purchaser").value;
          var address = document.getElementById("Receiver").value;
          var cellphone = document.getElementById("Cellphone").value;
          var greencake10 = document.getElementById("Greencake10").value;
          var greencake16 = document.getElementById("Greencake16").value;
          var greencake12 = document.getElementById("Greencake12").value;
          var goldvege = document.getElementById("Goldvege").value;
          var soltpork = document.getElementById("Soltpork").value;
          var spicysoup = document.getElementById("Spicysoup").value;
          total = greencake10*220 + greencake16*330 + greencake12*160 +
                  goldvege*135 + soltpork*165 + spicysoup*250
          msg = '姓名: ' + purchaser + '\n' +
                '地址: ' + address + '\n' + 
                '電話: ' + cellphone + '\n' + 
                '綠豆糕禮盒（10入裝）: ' + greencake10 + '盒\n' +
                '綠豆糕禮盒（16入裝）: ' + greencake16 + '盒\n' +
                '綠豆糕（12入裝）: ' + greencake12 + '盒\n' +
                '黃金泡菜（500公克）: ' + goldvege + '罐\n' +
                '客家鹹豬肉（300公克）: ' + soltpork + '條\n' +
                '麻辣鍋底（300公克）: ' + spicysoup + '包\n' +
                '總金額: ' + total + '元'
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

    $('.query-form').on('submit', function(e) {
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this imaginary file!",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Yes, 確定 查詢!",
            cancelButtonText: "No, 取消 查詢!",
            closeOnConfirm: false,
            closeOnCancel: false,
            showLoaderOnConfirm: true
        }, function(isConfirm) {
            if (isConfirm) {
                setTimeout(function () {
                    google.load('visualization', '1.0', {'packages':['corechart'], 'callback': getFromGoogle});
                }, 2000);
            } else {
                swal("Cancelled", "取消 查詢", "error");
            }
        });
        return false;
    });

    function getFromGoogle() {
      var opts = {sendMethod: 'auto'};
      var phone = document.getElementById("QPhone").value;
      console.log(phone)
      // Replace the data source URL on next line with your data source URL.
      var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1udfsd1HvGipZ_Qb2ImWzaY55QUQBsAGDSmGP06IsVT4/edit?usp=sharing', opts);

      // Optional request to return only column C and the sum of column B, grouped by C members.
      query.setQuery("select * where B = '"+ phone+"'");

      // Send the query with a callback function.
      query.send(handleQueryResponse);
    }

    function handleQueryResponse(response) {
      // Called when the query response is returned.
        if (response.isError()) {
           alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
           return;
        }

        var data = response.getDataTable();
        var numrows = data.getNumberOfRows();
        var table = '';

        for (var row=0; row < numrows; row++) {

            var date = data.getValue(row, 0);
            // var purchaser = data.getValue(row, 1);
            // var receiver = data.getValue(row, 2);
            // var email = data.getValue(row, 3);
            // var phone = data.getValue(row, 4);
            // var address = data.getValue(row, 5);
            // var payment = data.getValue(row, 6);
            // var terms = data.getValue(row, 7);
            // var pomelo = data.getValue(row, 8);
            // var peiyu = data.getValue(row, 9);
            // var remark = data.getValue(row, 10);

            table += 'Date: ' + date + '\n';
        }
        if (table === "")
            swal("Oops...", "查無資料", "error");
        else
            swal("Good job!", table, "success");
    }

    function postToGoogle() {
               var purchaser = document.getElementById("Purchaser").value;
               var address = document.getElementById("Receiver").value;
               var cellphone = document.getElementById("Cellphone").value;
               var greencake10 = document.getElementById("Greencake10").value;
               var greencake16 = document.getElementById("Greencake16").value;
               var greencake12 = document.getElementById("Greencake12").value;
               var goldvege = document.getElementById("Goldvege").value;
               var soltpork = document.getElementById("Soltpork").value;
               var spicysoup = document.getElementById("Spicysoup").value;
               total = greencake10*220 + greencake16*330 + greencake12*160 +
                  goldvege*135 + soltpork*165 + spicysoup*250
               if (spicysoup == null)
                  spicysoup = 0
               // console.log(field1)
               // console.log(field2)
               // console.log(field3)
               $.ajax({
                   url: "https://docs.google.com/forms/d/e/1FAIpQLScioIA59ZN71aZmmeMElf3u42nd82Di5K-YREifDJ3EVq2QFw/formResponse",
                   data: {
                    "entry.473890833": purchaser,
                    "entry.1581381411": address,
                    "entry.1174023174": cellphone,
                    "entry.2034997727": greencake10,
                    "entry.1545457419": greencake16,
                    "entry.605296088": greencake12,
                    "entry.1470562695": goldvege,
                    "entry.1735211531": soltpork,
                    "entry.387391597": spicysoup,
                    "entry.1716117777": total,
                  },
                   type: "POST",
                   //dataType: "xml",
                   statusCode: {
                       0: function() {
                           console.log("successful")
                           success = purchaser + '先生/小姐' + '\n'+ '感 謝 您 的 訂 購!'
                                     + '訂購資訊:' + '\n' + address + cellphone
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