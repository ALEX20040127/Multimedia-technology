/*
	Module  :ex6
    Description:1）键盘交互：游戏开始后见到米老鼠按空格，右边canvas会出现统计值，
                如果没有米老鼠的时候按空格，则游戏出现“GAME OVER”.

                2）鼠标交互：游戏开始后见到米老鼠后用鼠标框住米老鼠，鼠标移动会改变
                红框大小，放开鼠标或者鼠标移动到 canvas 外部，红框定格。
                如果米老鼠在鼠标划出方框的误差范围内，则显示捕获到 1 只，否则不累计。

	Author    :zjvivi
	Build_Date:2023-11-12
	Version   :1.0
 */

//1. 公共变量声明块........................................................

//常量声明区
const MICKY_IMG_PATH="images/micky.jpeg";
const MOVIE_BACKGROUND_COLOR="black";
const IMAGE_BACKGROUND_COLOR="#ffc";
const BORDER_RADIUS=20;
const INTERVAL=[300,3000];
const FONT_HEIGHT=30;
const CATCH_ERROR_MARGIN=200;
const RECT_STROKE_STYLE='red';
const RECT_FILL_STYLE='rgba(255,0,0,0.2)';
const CATCH_INFO="+1";
const GREY_INFO="+5";

//变量声明区
// movieCanvas对象
var movieCanvas,imageCanvas,hiddenCanvas;
var movieContext,imageContext,hiddenContext;

var image=new Image();
var rndMickyRect=new Rect();
var imagedata,copyData;
//2. 函数定义块...........................................................
//绘制圆形米老鼠（剪切方式实现）
function clipImage(context,img,point){
    let rect=new Rect(0,0,img.width,img.height);
    let circle=new Circle(img.width/2,img.height/2, img.width/2,0, Math.PI *2, true);
   
    rndMickyRect.setRectCord(point.x-img.width/2,point.y-img.height/2); //设置新产生米老鼠的绘制起始点
    context.save();
    //剪切图像
    context.translate(point.x-img.width/2, point.y-img.height/2);
    drawCirclePath(context,circle,true,false);
    context.clip(); 
    drawImg(context,image,rect);
    context.restore();
    drawHandledImgData(movieContext,rndMickyRect);
    
}

function setMickyOnImageCanvas(canvas,context,img){
    let pattern=context.createPattern(image, 'no-repeat'); 
    let circle=new Circle(img.width/2,img.height/2, img.width/2,0, Math.PI *2, true);
    context.save();
    context.translate(canvas.width/2-img.width/2, canvas.height/2-img.height/2);
    drawCirclePath(context,circle,true,false);
    putColorOnPath(context,pattern,1);
    context.restore();   
}


function setLinearGradientOnImageCanvas(canvas,context){
    let gradientRect=new Rect(0,0,0,canvas.height);
    let rect=new Rect(0,0,canvas.width,canvas.height);
    let gradient=createLinearGradient(context,gradientRect);
    gradient.addColorStop(0, '#fff');
    gradient.addColorStop(0.5, '#ffc');
    gradient.addColorStop(1, '#fcc');
    drawRect(context,rect,gradient,true);   
}

function setRadialGradientOnImageCanvas(canvas,context){
    let gradientCircle1=new Circle(canvas.width/2,canvas.height/2,canvas.width/5);
    let gradientCircle2=new Circle(canvas.width/2,canvas.height/2,canvas.width/2);
    let rect=new Rect(0,0,canvas.width,canvas.height);
    let gradient=createRadialGradient(context,gradientCircle1,gradientCircle2);
    gradient.addColorStop(0, '#fff');
    gradient.addColorStop(0.5, '#ffc');
    gradient.addColorStop(1, '#fcc');
    drawRect(context,rect,gradient,true);   
}

function initMovieCanvas(){
   
    movieCanvas=getCanvas('movieCanvas');
    movieContext=getContext(movieCanvas);
    movieCanvas.style.background=MOVIE_BACKGROUND_COLOR;
    movieCanvas.style.borderRadius=`${BORDER_RADIUS}px`;

    rect=new Rect(0,0,movieCanvas.width,movieCanvas.height); 

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

function getRndPoint(canvas,image){
    let point=new Point(0,0);
    point.x=parseInt(Math.random()*(canvas.width-image.width/2-image.width/2+1)+image.width/2);
    point.y=parseInt(Math.random()*(canvas.height-image.width/2-image.width/2+1)+image.width/2);
    return point;
}
function clearMovieCanvas(){
    clearCanvas(movieContext,rect);
    rndMickyRect.setRectCord(-image.width,-image.height); //初始化随机米老鼠的起始点
    catchFlag=false;
}


function drawMickyInCirclePath(){
    let mickyCenterPoint=getRndPoint(movieCanvas,image);
    clipImage(movieContext,image,mickyCenterPoint);
    
}

/**
 * 获取imgData对象
 * @param {Object} context 
 * @param {Object} rect 
 * @returns  imgData对象
 */
function getImgDataFromCanvas(context,rect){
    imagedata = context.getImageData(rect.x, rect.y,
        rect.width, rect.height);
    return imagedata;


}

/**
 *  复制imgData数据
 * @param {Object} imgData 
 * @param {Object} copyData 
 * @returns copyData 复制结果
 */
function copyImgData(imgData,copyData){
    copyData = imgData.data;//不能按地址传递
    return copyData;

}

/**
 * 在复制的imgData数组对象copyData中对图像进行灰度处理
 * @param {Object} context 
 * @param {Object} rect 
 * @returns 返回灰度处理后的copyData数据
 */
function handleImgData(context,rect){
    
    for(i=0; i < copyData.length - 4; i+=4) {
        average = (copyData[i] + copyData[i+1] + copyData[i+2]) / 3;
        copyData[i]   = average;
        copyData[i+1] = average;
        copyData[i+2] = average;
     }
     
     return copyData;
   
}

/**
 * 将灰度处理后的图像数据显示到制定的canvas中
 * @param {Object} context 
 * @param {Object} rect 
 */
function drawHandledImgData(context,rect){
    context.putImageData(copyData, rect.x, rect.y);
    
}





//3. 事件注册块...........................................................
function onImageLoad(){
    rndMickyRect.setRectSize(image.width,image.height);
    onMovieCanvasInterval();
    
    // setLinearGradientOnImageCanvas(imageCanvas,imageContext); //线性渐变
    setRadialGradientOnImageCanvas(imageCanvas,imageContext); //辐射渐变
    setMickyOnImageCanvas(imageCanvas,imageContext,image);
    
 }

function onMovieCanvasInterval(){
   
    clearMovieCanvas(); //清空屏幕
    drawMickyInCirclePath();
   
}









//4. 初始化块............................................................
function init(){
    
    initMovieCanvas();
    initImageCanvas();
    initHiddenCanvas(); //创建不可见的 canvas，做缓存用
    initImage();
}
init();  //程序入口


