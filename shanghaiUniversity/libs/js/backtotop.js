$(document).ready(function() {
  //首先将#back-to-top隐藏
  $("#back-to-top").hide();
  var w = (window.innerWidth - 1200) / 2 - 100;
  $("#back-to-top").css("right", w);
  $(window).resize(function() {
    w = (window.innerWidth - 1200) / 2 - 100;
    $("#back-to-top").css("right", w);
  });
  //当滚动条的位置处于距顶部100像素以下时
  $(function() {
    $(window).scroll(function() {
      if ($(window).scrollTop() > 100) {
        $(".top_bar").addClass("top_baractive");
        $(".top_baractive").addClass("animated fadeIn");
        // var color = "#fff",appendStr;
        // console.log(color)
        // appendStr = "<style>.top_bar .out_list .item>a::after{background:" + color + "}</style>";
        // $('.top_bar .out_list .item>a::after').append(appendStr);
        // $("#back-to-top").fadeIn(300);
      } else {
        $(".top_bar").removeClass("top_baractive");
        $("#back-to-top").fadeOut(300);
      }
    });
    //当点击跳转链接后，回到页面顶部位置
    $(".back-to-top").click(function() {
      $("body,html").animate(
        {
          scrollTop: 0
        },
        300
      );
      return false;
    });
  });
  $(".mess_fankui").click(function() {
    $("#feedbackModal").modal("show");
  });
});
