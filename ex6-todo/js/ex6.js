y:0
/*
	Module  :ex6
    Description:1、游戏开始后见到米老鼠在不定时的随机位置出现，右边为游戏初始状态，
                    显示抓住0只米老鼠；
                2、用户可以用鼠标框住米老鼠，鼠标移动会改变红框大小，红框是外部红色
                    实线，内部红色半透明的框；
                3、当鼠标拖动到放开鼠标或者鼠标移动到 canvas 外部，红框定格大小，
                    如果米老鼠在鼠标划出方框的误差范围内，则在红框上方显示“+1”，表示
                    捕获到 1 只，在右边canvas上会实时显示抓住x只米老鼠，方框过大或者
                    过小都不能表示捕获成功。
	Author    :wuyufei
	Build_Date:2023-11-7
	Version   :0.0
 */

//1. 公共变量声明块........................................................

//常量声明区
const MICKY_IMG_PATH="images/micky.jpeg";
const MOVIE_BACKGROUND_COLOR="black";
const IMAGE_BACKGROUND_COLOR="#ffc";
const BORDER_RADIUS=20;
const INTERVAL=[2000,3000];
const FONT_HEIGHT=30;
const CATCH_ERROR_MARGIN=2000;
const RECT_STROKE_STYLE='red';
const RECT_FILL_STYLE='rgba(255,0,0,0.2)';
const CATCH_INFO="+1";


//变量声明区
// movieCanvas对象
var movieCanvas,imageCanvas,hiddenCanvas;
var movieContext,imageContext,hiddenContext;

var image=new Image();
var iCount=0;
var rect,myRect = new Rect(),rndMickyRect = new Rect();
var mousedownPoint={
	x:0,
	y:0
}
var mousemovePoint={
    x:0,
    y:0
}
var mouseupPoint={
    x:0,
    y:0
}
var catchFlag=false;
var id;
var isCaughtMicky=true;
//2. 函数定义块...........................................................
//绘制圆形米老鼠（剪切方式实现）
function clipImage(context,img,point){
    // 【请补充】
    rndMickyRect=new Rect(point.x-img.width/2,point.y-img.height/2,
	                 img.width,img.height);
	let circle=new Circle(point.x,point.y,img.width/2,
							0,Math.PI*2,true);
	// console.log(circle);	
	context.save();
	drawCirclePath(context,circle,true,false); //1画圆路径
	context.clip(); //2剪切，真正画地盘
	context.globalAlpha=1; //全局透明度
	drawImg(context,img,rndMickyRect); //3绘制图像
	context.restore();
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
    let textStart = new Text('按下空格开始');
    textStart.point.x = movieCanvas.width/2;
    textStart.point.y = movieCanvas.height/2;
    textStart.props.font = '40px Arial';
    drawText(movieContext,textStart,'white',true);
}

function initImageCanvas(){
    imageCanvas=getCanvas('imageCanvas');
    imageContext=getContext(imageCanvas);
    imageCanvas.width=movieCanvas.width;
    imageCanvas.height=movieCanvas.height;
    imageCanvas.style.background=IMAGE_BACKGROUND_COLOR;
    imageCanvas.style.borderRadius=`${BORDER_RADIUS}px`;
}

//初始化不可见 canvas
function initHiddenCanvas(){
    //利用 functions.js中的 createCanvas 函数在内存创建  hiddenCanvas 对象
    //【请补充】
    hiddenCanvas = createCanvas();
    //利用 functions.js中的 getContext 函数获取 hiddenContext 对象
    //【请补充】
    hiddenContext = getContext(hiddenCanvas);
    //设置hiddenCanvas大小和 movieCanvas 大小一样
    //【请补充】
    hiddenCanvas.width = movieCanvas.width;
    hiddenCanvas.height = movieCanvas.height;
}

function initImage(){
    image.src=MICKY_IMG_PATH;
    image.onload=onImageLoad;
}


/**
 * 获取随机点坐标，能完整显示圆形米老鼠
 * @param {Object} canvas 
 * @param {Object} image 
 * @returns  返回点对象
 */
function getRndPoint(canvas,image){
    //【请补充】
    var rndPoint = new Point(parseInt(Math.random()*(canvas.width-image.width-1)),
                    parseInt(Math.random()*(canvas.height-image.width-1)));
    
   return rndPoint;
}
//清空 movieCanvas 内容
function clearMovieCanvas(){
    //利用 functions.js中的 clearCanvas 函数清空 movieCanvas 上显示的所有图像
    //【请补充】
    clearCanvas(movieContext,rect);
    catchFlag=false; 
}

/**
 *  显示米老鼠的捕捉信息
 * @param {Object} context 
 * @param {Object} canvas 
 */
function displayMickyCount(context,canvas){ 
    let text=new Text();

    //设置“抓住x 只米老鼠”的文本
    //【请补充】
    text.setText("抓住"+iCount+"只米老鼠");
    //设置显示文本的起始点坐标
    //【请补充】
    text.point.x=canvas.width/2;
    text.point.y=canvas.height/4;
    //设置文本的字号为 FONT_HEIGHT
    //【请补充】
    text.props.font=FONT_HEIGHT + "px Arial";
    //绘制黑色填充红色描边的文本
    //【请补充】
    drawText(context,text,'black',true);
    drawText(context,text,'red',false);
}

//仿照displayMickyCount函数绘制黄色填充红色描边的“ game over” 文本，
//绘制在movieCanvas 中心位置
function displayCatchError(context,canvas){
     //【请补充】
     let text=new Text();

    text.setText("game over");
   
    text.point.x=canvas.width/2;
    text.point.y=canvas.height/2;
    
    text.props.font=FONT_HEIGHT + "px Arial";
   
    drawText(context,text,'yellow',true);
    drawText(context,text,'red',false);
}

//绘制圆形米老鼠
function drawMickyInCirclePath(){
    let mickyCenterPoint=getRndPoint(movieCanvas,image);
    clipImage(movieContext,image,mickyCenterPoint);
    catchFlag=true; //表示可以开始捕捉米老鼠
    setTimeout(clearMovieCanvas,INTERVAL[0]);
}

/**
 * 绘制鼠标按下和移动后划出来的方框
 * @param {Object} mousedownPoint 
 * @param {Object} mousemovePoint 
 * @returns  返回方框对象
 */
function drawCatchRect(mousedownPoint,mousemovePoint){
    let catchRect=new Rect();
    let canvasRect=new Rect(0,0,movieCanvas.width,movieCanvas.height);
    if(Math.abs(mousemovePoint.x-mousedownPoint.x)>0 
        &&  Math.abs(mousemovePoint.y-mousedownPoint.y)>0){
            //【请补充在有效大小的情况下绘制方框的代码，方框颜色用RECT_STYLE】
            
            catchRect.setRectCord(mousedownPoint.x,mousedownPoint.y);
		    catchRect.setRectSize(mousemovePoint.x-mousedownPoint.x,
			mousemovePoint.y-mousedownPoint.y);
            // 绘制方框
            
            clearCanvas(movieContext,canvasRect);//清屏

            //再根据随机矩形绘制米老鼠
            
            let text
            drawText()
		    drawRect(movieContext,catchRect,RECT_FILL_STYLE,true);
		    drawRect(movieContext,catchRect,RECT_STROKE_STYLE,false);
            
           
    }
    return catchRect;

}

/**
 * 复制当前背景到隐藏的 canvas 中
 * @param {Object} context 隐藏 canvas 的 context 对象
 * @param {Object} sourceCanvas 当前活动 canvas 
 * @param {Object} rect 复制背景的范围
 */
function copyMovieCanvas(context,sourceCanvas,rect){
    //【请补充】
    context.drawImage(sourceCanvas, rect.x, rect.y, rect.width, rect.height, 0, 0, rect.width, rect.height);
}



/**
 * 从隐藏 canvas 中获取重绘背景
 * @param {Object} context 绘制目标
 * @param {Object} bakCanvas 隐藏 canvas 对象
 * @param {Object} rect 复制范围
 */
function getMovieCanvasCopy(context,bakCanvas,rect){
    drawImg(context,bakCanvas,rect);
}

//

/**
 * 鼠标事件注册
 * @param {Boolean} isMove isMove 来判别是否按住左键移动鼠标
 */
function mouseEventHandle(isMove){
    if(isMove){
        movieCanvas.onmousemove=onCanvasMousemove;
        movieCanvas.onmouseup=onCanvasMouseup;
        movieCanvas.onmouseout=onCanvasMouseout;
        movieCanvas.onmousedown=null;
    }else{
        movieCanvas.onmousemove=null;
        movieCanvas.onmouseup=null;
        movieCanvas.onmouseout=null;
        movieCanvas.onmousedown=onCanvasMousedown;
    }
}


/**
 * 判断米老鼠是否在划出来的方框内
 * @param {Object} mickyRect 随机米老鼠的外接框
 * @param {Object} yourRect 鼠标划出来的方框
 * @returns 抓住 micky 的结果，true 抓住，false 未抓住
 */
function isMickyInYourRect(mickyRect,yourRect){
    let isCaught=false;
    
    var yourRectWithMargin = {
        x: yourRect.x - CATCH_ERROR_MARGIN,
        y: yourRect.y - CATCH_ERROR_MARGIN,
        w: yourRect.w + 2 * CATCH_ERROR_MARGIN,
        h: yourRect.h + 2 * CATCH_ERROR_MARGIN,
      };
    //【请补充在 误差范围（CATCH_ERROR_MARGIN）内是否捕捉到 micky 的判别代码】
    console.log(yourRectWithMargin.w+yourRectWithMargin.x);
    console.log(myRect.x)
    if (
        mickyRect.x + mickyRect.w >= yourRectWithMargin.x &&
        mickyRect.x <= yourRectWithMargin.x + yourRectWithMargin.w &&
        mickyRect.y + mickyRect.h >= yourRectWithMargin.y &&
        mickyRect.y <= yourRectWithMargin.y + yourRectWithMargin.h
    ) {
      isCaught = true;
    }
    return isCaught;
}

//重绘 movieCanvas 的背景
function redrawMovieCanvas(){
    clearCanvas(movieContext,rect);
    getMovieCanvasCopy(movieContext,hiddenCanvas,rect);
}

//显示游戏反馈结果
function displayGameResult(){
    if(catchFlag){
        iCount++;
        clearCanvas(imageContext,rect);
        setRadialGradientOnImageCanvas(imageCanvas,imageContext); //辐射渐变
        setMickyOnImageCanvas(imageCanvas,imageContext,image);
        displayMickyCount(imageContext,imageCanvas);
        catchFlag = false;
   }else{
        //游戏出口
        clearTimeout(id);
        clearCanvas(movieContext,rect);
        displayCatchError(movieContext,movieCanvas); 
   }
}
//3. 事件注册块...........................................................
function onImageLoad(){

    
    // setLinearGradientOnImageCanvas(imageCanvas,imageContext); //线性渐变
    setRadialGradientOnImageCanvas(imageCanvas,imageContext); //辐射渐变
    setMickyOnImageCanvas(imageCanvas,imageContext,image); //在 imagecanvas 上以图案方式绘制米老鼠
    rndMickyRect.setRectSize(image.width,image.height); //初始化 mickyRect 大小
    
    //【请补充键盘事件注册】
    window.onkeydown=onWindowKeydown;
    mouseEventHandle(0); //注册鼠标事件侦听
    displayMickyCount(imageContext,imageCanvas); //初始化imageCanvas上的显示内容
 }

 //不定时出现随机位置的圆形米老鼠，并且出现米老鼠一定时间后擦除米老鼠图像
function onMovieCanvasInterval(){
    //【请补充】
   clearMovieCanvas();
   drawMickyInCirclePath();
   console.log(catchFlag);

}

//鼠标 mousedown 事件处理
function onCanvasMousedown(e){
    //【请补充】
   mousedownPoint.x = e.clientX;
   mousedownPoint.y = e.clientY;
   mousedownPoint = convertWindowToCanvas(movieCanvas,mousedownPoint);
   clearInterval(id);
   console.log('按下');

   isCaughtMicky = false;
   clearCanvas(hiddenContext,rect);
   hiddenContext.drawImage(movieCanvas,0,0);//离屏备份movie图像
   mouseEventHandle(1);
}

//鼠标 mousemove 事件处理
function onCanvasMousemove(e){
   //【请补充】
    mousemovePoint.x=e.clientX;
    mousemovePoint.y=e.clientY;
    mousemovePoint=convertWindowToCanvas(movieCanvas,mousemovePoint);

    clearCanvas(movieContext,rect);//清屏
 
    drawCatchRect(mousedownPoint,mousemovePoint);
    movieContext.drawImage(hiddenCanvas,0,0);
}


//鼠标 mouseout 事件处理
function onCanvasMouseout(e){
  onCanvasMouseup(e);
}

//鼠标 mouseup 事件处理
function onCanvasMouseup(e){
     //【请补充】
     mouseupPoint.x = e.clientX;
     mouseupPoint.y = e.clientY;
     
     console.log(rndMickyRect.x);
     myRect.setRectCord(mousedownPoint.x,mousedownPoint.y);
     myRect.setRectSize(mouseupPoint.x - mousedownPoint.x,mouseupPoint.y - mouseupPoint.y);
    //  console.log(myRect.w);
     catchFlag=isMickyInYourRect(rndMickyRect,myRect);
     console.log(catchFlag);
     displayGameResult();
     clearCanvas(movieContext,rect);
     id = setInterval(onMovieCanvasInterval,1000);
     mouseEventHandle(0);
}


function onWindowKeydown(e){
    if(e.keyCode==32){ //当空格键按下
        id = setInterval(onMovieCanvasInterval,1000); 
        console.log(id);
        
       
    }
}
//4. 初始化块............................................................
function init(){
    initMovieCanvas();
    initImageCanvas();
    initHiddenCanvas(); //创建不可见的 canvas，做缓存用
    initImage();
}
init();  //程序入口


