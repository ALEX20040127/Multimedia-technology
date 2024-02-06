var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var currentpage="videobuttons";
var videos = [
  {
    src: VIDEO_SETTING.videoUrl[0],
    title: "视频1",
    imageSrc: VIDEO_SETTING.imageUrl
  },
  {
    src: VIDEO_SETTING.videoUrl[1],
    title: "视频2",
    imageSrc: VIDEO_SETTING.imageUrl
  },
  {
    src: VIDEO_SETTING.videoUrl[2],
    title: "视频3",
    imageSrc: VIDEO_SETTING.imageUrl
  }
];

var buttonWidth = 200;
var buttonHeight = 100;
var buttonMargin = 50;
var startX = (canvas.width - (buttonWidth + buttonMargin) * videos.length + buttonMargin) / 2;
var startY = canvas.height * 4 / 6;
var videoElement = null;
var initialCanvasWidth = canvas.width;
var initialCanvasHeight = canvas.height;

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function playVideo(videoSrc) {
  canvas.removeEventListener("click",onReturnClick);
  canvas.addEventListener("click",onVedioReturnClick);
  if (videoElement) {
    videoElement.pause();
    videoElement.remove();
  }

  clearCanvas(); // 清除画布

  videoElement = document.createElement("video");
  videoElement.src = videoSrc;
  videoElement.controls = true;

  videoElement.addEventListener("loadedmetadata", function() {
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;

    videoElement.play();
    requestAnimationFrame(drawFrame);
  });

  videoElement.addEventListener("ended", function() {
    videoElement.pause();
    videoElement.remove();
    videoElement = null;
  });
  
}


function drawVideoButtons() {
  drawReturnButton();
  for (var i = 0; i < videos.length; i++) {
    (function(index) {
      var image = new Image();
      image.src = videos[index].imageSrc;
      image.onload = function() {
        var rect = {
          x: startX + (buttonWidth + buttonMargin) * index,
          y: startY,
          w: buttonWidth,
          h: buttonHeight
        };

        context.drawImage(this, rect.x, rect.y, rect.w, rect.h);

        context.fillStyle = "#000";
        context.font = "20px FangSong";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(videos[index].title, rect.x + rect.w / 2, rect.y + rect.h / 2);
      };
    })(i);
  }
}

//视频按钮界面点击按钮播放视频事件
function onVideoButtonclick(e) {
  var x = e.clientX - canvas.getBoundingClientRect().left;
  var y = e.clientY - canvas.getBoundingClientRect().top;
    

  for (var i = 0; i < videos.length; i++) {
    var rect = {
      x: startX + (buttonWidth + buttonMargin) * i,
      y: startY,
      w: buttonWidth,
      h: buttonHeight
    };

    if (x >= rect.x && x <= rect.x + rect.w && y >= rect.y && y <= rect.y + rect.h) {
      clearCanvas();
      playVideo(videos[i].src);
      break;
    }
  }
}

function onReturnClick(e){
  var x = e.clientX - canvas.getBoundingClientRect().left;
  var y = e.clientY - canvas.getBoundingClientRect().top;

  var returnButtonWidth = 100;
  var returnButtonHeight = 50;
  var returnButtonX = 200;
  var returnButtonY = 200;

  if (x >= returnButtonX && x <= returnButtonX + returnButtonWidth && y >= returnButtonY && y <= returnButtonY + returnButtonHeight) {
      clearCanvas();
      canvas.removeEventListener("click",onVedioReturnClick);
      canvas.removeEventListener("click",onVideoButtonclick);
      
      canvas.width = initialCanvasWidth;
      canvas.height = initialCanvasHeight;
      pageGuidance();
  }
}

function onVedioReturnClick(e){
  var x = e.clientX - canvas.getBoundingClientRect().left;
  var y = e.clientY - canvas.getBoundingClientRect().top;

  if (videoElement) {
    var returnButtonWidth = 100;
    var returnButtonHeight = 50;
    var returnButtonX = 200;
    var returnButtonY = 200;

  if (x >= returnButtonX && x <= returnButtonX + returnButtonWidth && y >= returnButtonY && y <= returnButtonY + returnButtonHeight) {
        clearCanvas();
        videoElement.pause();
        videoElement.remove();
        videoElement = null;
      
        // 恢复初始尺寸
        canvas.width = initialCanvasWidth;
        canvas.height = initialCanvasHeight;
      
        drawVideoButtons();
        return;
      }
  }
}

function drawReturnButton(){

    var returnButtonWidth = 100;
    var returnButtonHeight = 50;
    var returnButtonX = 200;
    var returnButtonY = 200;
  
    context.fillStyle = "#ccc";
    context.fillRect(returnButtonX, returnButtonY, returnButtonWidth, returnButtonHeight);
  
    context.fillStyle = "#000";
    context.font = "16px Arial";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText("返回", returnButtonX + returnButtonWidth / 2, returnButtonY + returnButtonHeight / 2);
    canvas.addEventListener("click",onReturnClick);
  }
  
function drawFrame() {
    if (videoElement) {
      context.drawImage(videoElement, 440, 200, canvas.width / 2, canvas.height / 2);
      drawReturnButton();
    }
    requestAnimationFrame(drawFrame);
  }
  
function videoPlay() {
  clearCanvas();
  drawVideoButtons();
  // var image = new Image();
  // image.src = GUIDE_SETTINGS.imgUrl.background;
  // image.onload=function(){
    
  //   context.drawImage(image,0,0);
  // };
  canvas.addEventListener("click", onVideoButtonclick);
}

// videoPlay();
