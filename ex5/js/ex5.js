/*
	Function  :ex5
    Description:1)左边canvas每隔一定时间随机位置出现完整的圆形米老鼠图案（要去用剪切方法实现圆形），
                右边canvas出现辐射渐变为背景色的圆形米老鼠图案，并显示“抓住0只米老鼠”
                2)选做题：游戏开始后见到米老鼠按空格，右边canvas会出现统计值，
                如果没有米老鼠的时候按空格，则游戏出现“GAME OVER”.
	Author    :wuyufei
	Build_Date:2023-10-31
	Version   :0.0
 */

//1. 公共变量声明块........................................................

//常量声明区
const MICKY_IMG_PATH="images/micky.jpeg";
const ONE_SECOND=1000;
const MOVIE_BACKGROUND_COLOR="black";
const IMAGE_BACKGROUND_COLOR="#ffc";
const BORDER_RADIUS=20;
const INTERVAL=[500,3000];
const FONT_HEIGHT=30;
const FONT_COLOR='black'
//变量声明区
// movieCanvas对象，imageCanvas对象
var movieCanvas,imageCanvas;
var movieContext,imageContext;
var image = new Image();
var sum = 0;
var text = new Text("抓住"+sum+"只米老鼠");
var text1 = new Text("按下空格键开始");
var time = 0;
var timerId;
var mickyFlag = false;
//2. 函数定义块...........................................................

/**
 * 绘制canvas的线性渐变背景
 * @param {Object} canvas 
 * @param {Object} context 
 */
function setLinearGradientOnImageCanvas(canvas,context){
    var grd = context.createLinearGradient(0, 0, canvas.width, canvas.height);
    grd.addColorStop(0, 'pink');
    grd.addColorStop(0.5,'hotpink');
    grd.addColorStop(1,'red');
    return grd;
    
}
/**
 * 绘制canvas的辐射渐变背景
 * @param {Object} canvas 
 * @param {Object} context 
 */
function setRadialGradientOnImageCanvas(canvas,context){
     var grd=context.createRadialGradient(
        canvas.width/2, canvas.height/2 ,canvas.width/4,
        canvas.width/2, canvas.height/2, canvas.width/2);
    grd.addColorStop(0, '#fff');
    grd.addColorStop(0.5, '#ffc');
    grd.addColorStop(1, 'pink');
    return grd;
}

function initMovieCanvas(){
    movieCanvas=getCanvas('movieCanvas'); //获取canvas
    movieContext=getContext(movieCanvas); //获取context对象
    movieCanvas.style.background=MOVIE_BACKGROUND_COLOR; //设置canvas为黑色背景
    movieCanvas.style.borderRadius=`${BORDER_RADIUS}px`; //设置canvas的边框为圆角矩形
    
}

function initImageCanvas(){
    imageCanvas=getCanvas('imageCanvas'); //获取canvas
    imageContext=getContext(imageCanvas); //获取context对象
    imageCanvas.width=movieCanvas.width; //设置两块canvas一样宽
    imageCanvas.height=movieCanvas.height; //设置两块canvas一样高
    imageCanvas.style.background=IMAGE_BACKGROUND_COLOR; //设置canvas为黄色背景
    imageCanvas.style.borderRadius=`${BORDER_RADIUS}px`;  //设置canvas的边框为圆角矩形
    
}

function initImage(){
    //设置image路径【请补充】
    image.src= MICKY_IMG_PATH;
    //注册image的load事件，事件处理函数为onImageLoad【请补充】
    image.onload=onImageLoad;
}


//3. 事件注册块...........................................................
function onImageLoad(){

    let props={
        align:"center",
        baseline:"middle",
        font:"bold 30px Arial"
    };
    let point={
        x:imageCanvas.width/2,
        y:imageCanvas.height/2-image.height/2
    };
    // let point1={
    //     x:movieCanvas.width/2,
    //     y:movieCanvas.height/2-movieCanvas.height/2
    // }
    text.setProps(props);
    text.setPoint(point);
    text1.setPoint(point);
    text1.setProps(props);
    var centerPoint={
        x:imageCanvas.width/2-image.width/2,
        y:imageCanvas.height/2-image.height/2
   }
   var startPoint={
        x:image.width/2,
        y:imageCanvas.height/2-image.height/2
   }


    //绘制左边黑色canvas的第1帧图像，【请补充】
    drawMickyImage(movieContext,image,startPoint);
    
    // 设置右边canvas的渐变背景效果，【请补充】
    var rect=new Rect(0,0, imageCanvas.width, imageCanvas.height);  
    var grd=setRadialGradientOnImageCanvas(imageCanvas,imageContext);
    drawRect(imageContext,rect,grd,true);

    // 右边canvas的绘制圆形米老鼠图像，【请补充】
    drawMickyImage(imageContext,image,centerPoint);
    //在米老鼠图像的上方显示文本“抓住0只米老鼠”，【请补充】
    drawText(imageContext,text,FONT_COLOR,true);
    //左边canvas上米老鼠在随机位置不定时出现，【请补充】
    drawText(movieContext,text1,'white',true);
}   

function onMovieCanvasInterval(){
    // 剪切图像的形式在左边canvas的随机位置不定时出现完整的圆形米老师图像，【请补充】
    var rndPoint ={
        x:parseInt(Math.random()*(movieCanvas.width-image.width-1)),
        y:parseInt(Math.random()*(movieCanvas.height-image.width-1)),
   }
   var rect=new Rect(0,0, movieCanvas.width, movieCanvas.height);  
   clearCanvas(movieContext,rect);
   console.log(1);
   drawMickyImage(movieContext,image,rndPoint);
   mickyFlag = true;
   setTimeout(clearMicky,INTERVAL[0]);//buchong
}


function clearMicky(){//buchong
    clearCanvas();
    // console.log("black");
    mickyFlag = false;
}
/**
 * 重新在右边的屏幕上写上抓到了几只米老鼠
 */
function redrawRight(){
    var centerPoint={
        x:imageCanvas.width/2-image.width/2,
        y:imageCanvas.height/2-image.height/2
   }
  
    var rect=new Rect(0,0, imageCanvas.width, imageCanvas.height);  
    var grd=setRadialGradientOnImageCanvas(imageCanvas,imageContext);

    clearCanvas(imageContext,rect);
    

    drawRect(imageContext,rect,grd,true);
    drawMickyImage(imageContext,image,centerPoint);
    drawText(imageContext,text,FONT_COLOR,true);
}
function redrawLeft(){
    var startPoint={
        x:image.width/2,
        y:imageCanvas.height/2-image.height/2
    }
    var rect1=new Rect(0,0,movieCanvas.width,movieCanvas.height);
    clearCanvas(movieContext,rect1);

    drawMickyImage(movieContext,image,startPoint);
    drawText(movieContext,text1,'white',true);
}

function onTimerTick(){
    time++;
}

function stopGame(){
  clearInterval(intervalId);
  clearInterval(timerId);
  time = 0;
  sum = 0;
  text.setText("抓住" + sum + "只米老鼠");
  text1.setText("按下空格键开始游戏");
  redrawRight();//重新画右边屏幕
  redrawLeft();
}

function onSpaceKeyDown(event) {
    if (event.code === "Space") {
      if (sum == 0) {
        intervalId = setInterval(onMovieCanvasInterval, ONE_SECOND*2);
        timerId = setInterval(onTimerTick, ONE_SECOND);
        sum++;
        console.log(time);
      }else{
            if (time % ONE_SECOND % 2 != 0) {
                // 时间不是interval的倍数，结束游戏
                console.log(time);
                stopGame();
            }else{
                text.setText("抓住" + sum + "只米老鼠");
                redrawRight();
                drawText(imageContext,text,FONT_COLOR,true);
                sum++;
            }
      }
      //开始计时

    }
  }
//4. 初始化块............................................................
function init(){
    initMovieCanvas();
    initImageCanvas();
    initImage();
    window.onkeydown=onSpaceKeyDown;
}
init();  //程序入口



