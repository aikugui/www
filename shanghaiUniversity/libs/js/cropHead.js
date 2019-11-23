//判断浏览器是否IE8以下
function ieVersion() {
  var DEFAULT_VERSION = "8.0";
  var ua = navigator.userAgent.toLowerCase();
  var isIE = ua.indexOf("msie") > -1;
  var safariVersion;
  if (isIE) {
    safariVersion = ua.match(/msie ([\d.]+)/)[1];
  }
  if (safariVersion <= DEFAULT_VERSION) {
    return true;
  }
}

//上传头像
var objectURL,
  setSelectW,
  oScale,
  outX,
  outY,
  outLength,
  outRotate, //输出信息
  imgW,
  imgH,
  imgX,
  imgY,
  imgScale,
  selectW,
  selectH,
  selectX,
  selectY,
  canvasW,
  canvasH,
  canvasX,
  canvasY,
  ieV = ieVersion(),
  oImg = $("#crop-target"),
  oMask = $(".crop-mask"),
  cropOrigin = $("#crop-origin"),
  oSelect = $(".crop-select");

oImg.load(crop);

//设置预览图片大小
function setAllPreview() {
  setPreviewSize(120);
  setPreviewSize(60);
  setPreviewSize(30);
  setPreviewSize(80);
  $(".preview-container.w80").show();
  $(".jcrop-preview").show();
}
function move(obj, left, top) {
  obj.css({ left: left + "px", top: top + "px" });
}
function getCanvasPos() {
  imgX = oMask.position().left;
  imgY = oMask.position().top;
  imgW = oImg.width();
  imgH = oImg.height();
}
function getSelectPos() {
  (selectW = oSelect.width()),
    (selectH = oSelect.height()),
    (selectX = oSelect.position().left),
    (selectY = oSelect.position().top);
}
function setRect() {
  if (oImg.width() < 100 || oImg.height() < 100) {
    setSelectW = 0;
    $(".crop-handle").hide();
    $(".crop-tracker").hide();
    $(".crop-mask>div").hide();
  } else if (oImg.width() < 200 || oImg.height() < 200) {
    setSelectW = 100;
    $(".crop-handle").show();
    $(".crop-tracker").show();
    $(".crop-mask>div").show();
  } else {
    setSelectW = 200;
    $(".crop-handle").show();
    $(".crop-tracker").show();
    $(".crop-mask>div").show();
  }
  oSelect.width(setSelectW);
  oSelect.height(setSelectW);
  var x = 200 - setSelectW * 0.5,
    y = 200 - setSelectW * 0.5;
  move(oSelect, x, y);
  cropOrigin.css({
    top: oSelect.height() * 0.5 - oImg.height() * 0.5 + "px",
    left: oSelect.width() * 0.5 - oImg.width() * 0.5 + "px"
  });
  setAllPreview();
}
function setPreviewSize(w) {
  imgScale = imgW / imgH;
  if (oImg.width() < 100) {
    if (imgW < 100) {
      $(".w" + w + " .jcrop-preview").height(w);
      $(".w" + w + " .jcrop-preview").width(w * imgScale);
    }
    $(".w" + w + " .jcrop-preview").css(
      "top",
      w * 0.5 - $(".w" + w + " .jcrop-preview").height() * 0.5
    );
    $(".w" + w + " .jcrop-preview").css(
      "left",
      w * 0.5 - $(".w" + w + " .jcrop-preview").width() * 0.5
    );
  } else if (oImg.height() < 100) {
    if (imgH < 100) {
      $(".w" + w + " .jcrop-preview").width(w);
      $(".w" + w + " .jcrop-preview").height(w / imgScale);
    }
    $(".w" + w + " .jcrop-preview").css(
      "top",
      w * 0.5 - $(".w" + w + " .jcrop-preview").height() * 0.5
    );
    $(".w" + w + " .jcrop-preview").css(
      "left",
      w * 0.5 - $(".w" + w + " .jcrop-preview").width() * 0.5
    );
  } else {
    $(".w" + w + " .jcrop-preview").width(oImg.width() * w / oSelect.width());
    $(".w" + w + " .jcrop-preview").height(oImg.height() * w / oSelect.width());
    $(".w" + w + " .jcrop-preview").css(
      "top",
      parseInt(cropOrigin.css("top")) * w / oSelect.width()
    );
    $(".w" + w + " .jcrop-preview").css(
      "left",
      parseInt(cropOrigin.css("left")) * w / oSelect.width()
    );
  }
  $(".preview_bar>div").show();
}

var startX, startY, offset, startImgX, startImgY;
$(".crop-shade").mousedown(function(e) {
  getSelectPos(),
    (startX = e.pageX - selectX), //获得鼠标指针离DIV元素左边界的距离
    (startY = e.pageY - selectY); //获得鼠标指针离DIV元素上边界的距离
  $(document).bind("mousemove", dragElement);
});
$(document).mouseup(function() {
  $(document).unbind("mousemove");
  document.unselectable = "off";
  document.onselectstart = null;
});
//$(".cut_bar").mouseleave(function(){$(document).unbind("mousemove"),dragElement});

var endX, endY, endImgX, endImgY;
function dragElement(ev) {
  //绑定鼠标的移动事件，因为光标在DIV元素外面也要有效果，所以要用doucment的事件，而不用DIV元素的事件
  var _x = ev.pageX - startX, //获得X轴方向移动的值
    _y = ev.pageY - startY; //获得Y轴方向移动的值
  getSelectPos();
  if (_x < imgX) {
    endX = imgX;
  } else if (_x > imgW - selectW + imgX) {
    endX = imgW - selectW + imgX;
  } else {
    endX = _x;
  }
  if (_y < imgY) {
    endY = imgY;
  } else if (_y > imgH - selectH + imgY) {
    endY = imgH - selectH + imgY;
  } else {
    endY = _y;
  }
  endImgX = startImgX - endX + (400 - setSelectW) * 0.5;
  endImgY = startImgY - endY + (400 - setSelectW) * 0.5;
  move(oSelect, endX, endY);
  move(cropOrigin, endImgX, endImgY);
  setAllPreview();
}
//dragElement over

function crop() {
  oMask.css({
    "-webkit-transform": "rotate(0deg)",
    "-moz-transform": "rotate(0deg)",
    "-ms-transform": "rotate(0deg)"
  });
  cropOrigin.css({
    "-webkit-transform": "rotate(0deg)",
    "-moz-transform": "rotate(0deg)",
    "-ms-transform": "rotate(0deg)"
  });
  $(".jcrop-preview").css({
    "-webkit-transform": "rotate(0deg)",
    "-moz-transform": "rotate(0deg)",
    "-ms-transform": "rotate(0deg)"
  });
  if (!ieV && $("#rotateImg").css("display") == "none") $("#rotateImg").show();
  if ($("#reUploadImg").css("display") == "none") $("#reUploadImg").show();
  oImg.css({ width: "auto", height: "auto" });
  var oWidth = oImg.width(),
    oHeight = oImg.height(),
    oRatio = oWidth / oHeight;
  //写入图片
  $("#uploadFile").css({
    opacity: 0,
    filter: "Alpha(opacity=0)",
    "z-index": "-1"
  });
  $(".crop-img").show();
  if (oImg.width() >= oImg.height()) {
    oImg.css({
      width: 400,
      height: "auto"
    });
    if (oImg.height() % 2 == 1) {
      oImg.css("height", oImg.height() + 1);
    }
  } else {
    oImg.css({
      width: "auto",
      height: 400
    });
    if (oImg.width() % 2 == 1) {
      oImg.css("width", oImg.width() + 1);
    }
  }
  imgW = oImg.width();
  imgH = oImg.height();
  if (imgW < 100 || imgH < 100) {
    alert("请上传正确尺寸的图片！");
  }
  setRect();
  oMask.css({
    left: 200 - oImg.width() * 0.5 + "px",
    top: 200 - oImg.height() * 0.5 + "px",
    width: oImg.width() + "px"
  });
  cropOrigin.css({
    height: oImg.height() + "px",
    width: oImg.width() + "px",
    display: "block",
    top: oSelect.height() * 0.5 - oImg.height() * 0.5 + "px",
    left: oSelect.width() * 0.5 - oImg.width() * 0.5 + "px"
  });
  startImgX = cropOrigin.position().left;
  startImgY = cropOrigin.position().top;
  getCanvasPos();
}
//crop() over

//图片旋转
var rotateNum = 0;
$("#rotateImg").click(function() {
  var deg = 90;
  if (oImg.length) {
    rotateNum++;
    deg = (rotateNum % 4) * 90;
    oMask.css({
      "-webkit-transform": "rotate(" + deg + "deg)",
      "-moz-transform": "rotate(-" + deg + "deg)",
      "-ms-transform": "rotate(" + deg + "deg)"
    });
    cropOrigin.css({
      "-webkit-transform": "rotate(" + deg + "deg)",
      "-moz-transform": "rotate(-" + deg + "deg)",
      "-ms-transform": "rotate(" + deg + "deg)"
    });
    $(".jcrop-preview").css({
      "-webkit-transform": "rotate(" + deg + "deg)",
      "-moz-transform": "rotate(-" + deg + "deg)",
      "-ms-transform": "rotate(" + deg + "deg)"
    });
    setRect();
    getCanvasPos();
    imgW = rotateNum % 2 == 1 ? oImg.height() : oImg.width();
    imgH = rotateNum % 2 == 1 ? oImg.width() : oImg.height();
  }
  return false;
});

//判断是否支持css3
function supportCSS3() {
  var div = document.createElement("div").style;
  return (
    "webkitPerspective" in div ||
    "MozPerspective" in div ||
    "OPerspective" in div ||
    "MsPerspective" in div ||
    "perspective" in div
  );
}

//获取图片地址
$("#file").change(function(e) {
  var obj = $(this);
  rotateNum = 0;
  // console.log(e.target.files[0].size);
  if (window.File && window.FileList && window.FileReader && window.Blob) {
    var file = e.target.files[0];
    if (!file) {
      return;
    }
    var reader = new FileReader();
    reader.onload = function(file) {
      oImg.attr("src", reader.result);
      cropOrigin.attr("src", reader.result);
      $(".jcrop-preview").attr("src", reader.result);
    };
    reader.readAsDataURL(file);
  } else if (navigator.userAgent.indexOf("MSIE") > 0) {
    obj.select();
    // IE下取得图片的本地路径
    objectURL = document.selection.createRange().text;

    oImg.attr("src", objectURL);
    cropOrigin.attr("src", objectURL);
    $(".jcrop-preview").attr("src", objectURL);
  } else if (obj[0].files) {
    // Firefox下取得的是图片的数据
    objectURL = window[window.webkitURL ? "webkitURL" : "URL"][
      "createObjectURL"
    ](obj[0].files[0]);
    // alert(objectURL);
    if (!objectURL) {
      return;
    }
    oImg.attr("src", objectURL);
    cropOrigin.attr("src", objectURL);
    $(".jcrop-preview").attr("src", objectURL);
    window[window.webkitURL ? "webkitURL" : "URL"]["revokeObjectURL"](
      obj[0].files[0]
    );
  }
});

var resizeStartX, resizeStartY, resizeEndX, resizeEndY, selectScale;
$(".crop-handle").mousedown(function(e) {
  document.unselectable = "on";
  document.onselectstart = function() {
    return false;
  };
  getSelectPos();
  selectScale = selectW / selectH;
  resizeStartX = e.pageX;
  resizeStartY = e.pageY;
  $(document).bind("mousemove", resizeSelect);
});
function resizeSelect(ev) {
  var resizeW = ev.pageX - resizeStartX;
  var w = selectW + resizeW;
  if (w <= 100) {
    w = 100;
  } //选框最小值
  else if (w > imgW - (selectX - imgX) || w > imgH - (selectY - imgY)) {
    if (imgW - (selectX - imgX) >= imgH - (selectY - imgY)) {
      w = imgH - (selectY - imgY);
    } else {
      w = imgW - (selectX - imgX);
    }
  }
  oSelect.width(w);
  oSelect.height(w);
  setAllPreview();
}
$("#uploadAvatarModal").mousedown(function(e) {
  e.preventDefault();
});

//点击关闭按钮
var fileup = document.getElementById(file);
var upload_avatar_modal = $(".upload_avatar_modal");
$("h4>span", upload_avatar_modal).click(function() {
  $(".preview-container.w80").hide();
  $(".edit .preview-container>img").hide();
  $("#uploadAvatarModal").modal("hide");
  if (upload_avatar_modal.data("user") == "reg") {
    $("#registerModal").modal("show");
  }
});
