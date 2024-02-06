//--------------------变量定义----------------------
//常量声明区
var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');

var ccPaper1=new Image();
var ccReel = new Image();
var ccLastTime = 0;
var ccFps = 0;
var ccReelOffset = 0;
var ccREEL_VELOCITY = 30; // 30 pixels/second
var ccEndFlag=0;
var ccArrowFlag=0;
var ccPageOneOff=0;

var ccEndSprite=new Sprite('end',new ImagePainter('static/images/paper3.png'));
var ccArrowSprite=new Sprite('start',new ImagePainter('static/images/paper11.png'));

//--------------------函数定义块----------------------
function ccErase() {
    //清屏
    context.clearRect(0,0,canvas.width,canvas.height);
 }
 
 //绘制滚动的图片
 function ccDraw() {
    ccReelOffset = ccReelOffset < ccReel.width ?
                ccReelOffset + ccREEL_VELOCITY/ ccFps : 0;
 
   
    context.save();
    context.translate(-ccReelOffset, 0);
    //尾页和首页的滚动图片绘制位置不同
    if(!ccEndFlag)
    {
        context.drawImage(ccReel, 0, canvas.height/3.5); 
        context.drawImage(ccReel, ccReel.width-2, canvas.height/3.5);
    }
    else
    {
        context.drawImage(ccReel, 0, canvas.height/5*2.7); 
        context.drawImage(ccReel, ccReel.width-2, canvas.height/4*2.7);
    }
    context.restore();
 }
 
 //求帧频
 function ccCalculateFps(now) {
    var ccFps = 1000 / (now - ccLastTime);
    ccLastTime = now;
    return ccFps; 
 }
 

 function animate(now) {
    if (now === undefined) {
       now = +new Date;
    }
    ccFps = ccCalculateFps(now);
    if(!ccPageOneOff)
    {
        ccErase();
        ccDraw();
        //绘制不同图片，每次clearCanvas之后都需要绘制静态图片
        if(ccEndFlag)
            ccEndSprite.paint(context);
            // drawbg1();
        else
            context.drawImage(ccPaper1,0,0);
        //开头页两秒后出现的arrow在尾页面不应该出现
        if(ccArrowFlag)
            ccArrowSprite.paint(context);
        requestNextAnimationFrame(animate);
     }
    }

//尾页面绘制的函数调用
function ccDrawEndPage(){
    ccEndFlag=1;
    requestNextAnimationFrame(animate);
}

function ccDrawbg1(){
    context.drawImage(ccPaper1,0,0);//,paper1.width,paper1.height
 }
 
 function onCcReelLoad(){//首页面主要元素为两个图片
    //除去滚动卷轴的部分为一张图，在这里引用下来
    ccPaper1.src = 'static/images/paper1.png';
    ccPaper1.onload = ccOnPoneLoad;

 }

 function ccOnPoneLoad(){
    //绘制静止的图片
    ccDrawbg1();
    //animate用于绘制滚动的卷轴
    requestNextAnimationFrame(animate);
    //图片出现两秒钟后出现箭头，引导点击下一页
    setTimeout(ccDrawArrow,2000);
 } 

 function ccDrawArrow(){
    ccArrowFlag=1;
    canvas.addEventListener("click",onCcCanvasCick);//不要使用onclick函数绑定点击事件
 }

 function onCcCanvasCick(){
    ccPageOneOff=1;
    //清屏
    var ccCanvasRect = new Rect(0,0,canvas.width,canvas.height); 
    clearCanvas(context,ccCanvasRect);
    //***********************
    pageGuidance();
    // choiceQuiz();
 }
//---------------------初始化块----------------------


function init(){
    ccReel.src = 'static/images/reel.png';
    //确保reel下载完成后开始绘制第一页内容
    ccReel.onload = onCcReelLoad;

}

init();