/*
	Module  :ex9
    Description:米老鼠视频帧绘制练习
	Author    :周x班-xxx
	Build_Date:2023-11-28
	Version   :1.0
 */
//1. 常量和变量定义............................................................
const VIDEO_WIDTH=610;
const VIDEO_HEIGHT=456;
const MICKY_IMG_PATH="images/micky.jpeg";
const MICKY_VIDEO_PATH="video/micky.mp4";
const MOVIE_BACKGROUND_COLOR="black";
const IMAGE_BACKGROUND_COLOR="#ffc";
const BORDER_RADIUS=20;

var movieCanvas,imageCanvas,hiddenCanvas;
var movieContext,imageContext,hiddenContext;
var iCount=0;
var image=new Image();
var imageAngle = 0;
//2. 函数定义............................................................
function initMovieCanvas(){
   
    movieCanvas=getCanvas('movieCanvas');
    movieContext=getContext(movieCanvas);
    movieCanvas.width=VIDEO_WIDTH;
    movieCanvas.height=VIDEO_HEIGHT;
    movieCanvas.style.background=MOVIE_BACKGROUND_COLOR;
    movieCanvas.style.borderRadius=`${BORDER_RADIUS}px`;

    rect=new Rect(0,0,movieCanvas.width,movieCanvas.height); 
    copyData=movieContext.createImageData(movieCanvas.width, movieCanvas.height);
}

function initImageCanvas(){
    imageCanvas=getCanvas('imageCanvas');
    imageContext=getContext(imageCanvas);
    imageCanvas.width=movieCanvas.width;
    imageCanvas.height=movieCanvas.height;
    imageCanvas.style.background=IMAGE_BACKGROUND_COLOR;
    imageCanvas.style.borderRadius=`${BORDER_RADIUS}px`;
}

function initHiddenCanvas(){
    hiddenCanvas=createCanvas();
    hiddenContext=getContext(hiddenCanvas);

    hiddenCanvas.width=movieCanvas.width;
    hiddenCanvas.height=movieCanvas.height;
}

function initImage(){
    image.src=MICKY_IMG_PATH;
    image.onload=onImageLoad;
}

function setMovieCanvasColor(){
    
}
// function rotateRect(){
//     var rect1 = new Rect(0,0,movieCanvas.width,movieCanvas.height);
//     clearCanvas(movieContext,rect1);
//     movieContext.save();
    
//       movieContext.translate(movieCanvas.width/2, movieCanvas.height/2);
   
//       movieContext.rotate(imageAngle);
//       movieContext.scale(0.5, 0.5);
    
//       imageAngle++;

//       var rect2=new Rect(-image.width/2,-image.height/2,image.width,image.height);
//       drawImg(movieContext,image,rect2);
//       movieContext.restore();
//        id1 =  setTimeout(rotateRect,1000);
//        console.log(imageAngle);
//        if(imageAngle>=8){
//         clearTimeout(id1);
//         var rect1 = new Rect(0,0,movieCanvas.width,movieCanvas.height);
//     clearCanvas(movieContext,rect1);
//         var text = new Text("GAME OVER");
//         text.point.x=movieCanvas.width/2;
//         text.point.y = movieCanvas.height/2;
//         drawText(movieContext,text,'white',true);
//      }
   
// }

//3. 事件处理定义............................................................

function onImageLoad(){
    
}

//4. 初始化块............................................................
function init(){
    
    initMovieCanvas();
    initImageCanvas();
    initHiddenCanvas(); //创建不可见的 canvas，做缓存用
    initImage(); 
   
}

init();  //程序入口


