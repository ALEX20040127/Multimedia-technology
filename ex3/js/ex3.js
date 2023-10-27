var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    FONT_HEIGHT = 30,
    MARGIN = 10,
    HAND_TRUNCATION = canvas.width/25,
    HOUR_HAND_TRUNCATION = canvas.width/10,
    NUMERAL_SPACING = 30,
    RADIUS = canvas.width/2 - MARGIN,
    HAND_RADIUS = RADIUS - NUMERAL_SPACING;

var pattern;
//新建图像对象
var image=new Image();
var imageAngle=0;
//定义圆对象，需要有以下信息
//绘制圆心坐标(x,y)、半径r、起始弧度startAngle、终止弧度endAngle和是否顺时针clockwise信息
var circle={
    x:canvas.width/2,
    y:canvas.height/2,
    r:RADIUS,
    startAngle:0,
    endAngle:Math.PI*2,
    clockwise:false
};

let text={
   text:"",
   align:"center",
   baseline:"middle",
   x:canvas.width/2,
   y:canvas.height/2,
   font:'bold  ${FONT_HEIGHT}px Arial'
};

let line={
   x1:canvas.width/2, 
   y1:canvas.height/2,
   x2:canvas.width, 
   y2:canvas.height,
};

let rect={
   x:0,
   y:0,
   w:canvas.width,
   h:canvas.height
};
// Functions.....................................................
//绘制钟的外圆
function drawCircle() {
   context.save();
   //调用functions.js中的drawCirclePath函数绘制圆路径
   circle.r=RADIUS;
   drawCirclePath(circle,true,false);
   context.lineWidth=15;
   //添加阴影

   context.shadowColor='pink';
   context.shadowBlur=20;
   context.shadowOffsetY=10;

   //调用functions.js中的putColorOnPath函数用默认色描边圆路径
   putColorOnPath("LightBlue",0);
   context.restore();

}
   
function drawNumerals() {
   var numerals = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ],
       angle = 0,
       numeralWidth = 0  ;

   numerals.forEach(function(numeral) {
      angle = Math.PI/6 * (numeral-3);
      numeralWidth = context.measureText(numeral).width;

      //调用functions.js中的drawText函数绘制时钟上的数字
      text.text=numeral;
      text.x=canvas.width/2  + Math.cos(angle)*(HAND_RADIUS) ;
      text.y=canvas.height/2 + Math.sin(angle)*(HAND_RADIUS) + FONT_HEIGHT/3;
      drawText(text,"SlateGray",1);
      
   });
}

function drawCenter() {
    //调用functions.js中的drawCirclePath函数绘制钟面中心点的圆路径
    circle.r=5;
    drawCirclePath(circle,true,false);

    //调用functions.js中的putColorOnPath函数用默认色填充
    putColorOnPath("black",1);


}

function drawHand(loc, isHour,lineWidth) {
   var angle = (Math.PI*2) * (loc/60) - Math.PI/2,
       handRadius = isHour ? RADIUS - HAND_TRUNCATION-HOUR_HAND_TRUNCATION 
                           : RADIUS - HAND_TRUNCATION;
   
    //调用functions.js中的drawLinePath函数绘制指针路径
    line.x2=canvas.width/2  + Math.cos(angle)*handRadius;
    line.y2=canvas.height/2 + Math.sin(angle)*handRadius;
    drawLinePath(line,1);

   context.lineWidth=lineWidth;
    //调用functions.js中的putColorOnPath函数用描边指针线段
    if(isHour){
      putColorOnPath('deeppink',0);
    }else{
      putColorOnPath('SlateGray',0);
    }
}

function drawHands() {
   var date = new Date,
       hour = date.getHours();
   hour = hour > 12 ? hour - 12 : hour;
   drawHand(hour*5 + (date.getMinutes()/60)*5, true,10);
   drawHand(date.getMinutes(), false,5);
   drawHand(date.getSeconds(), false,1);
}

function drawClock() {
   //调用functions.js中的clearCanvas函数清屏
   clearCanvas(context,rect);
   // 图案绘制
   drawClockPattern();
   drawCircle();
   drawCenter();
   drawDot();
   drawDate();
   drawHands();
   drawNumerals();
}

//绘制钟面图像
function drawClockPattern(){
   //保存绘图环境
   context.save();

   // //平移坐标系，让图像的中心点可以和canvas中心点吻合
   context.translate(canvas.width/2,canvas.height/2);  //改变坐标原点,坐标系平移
   context.rotate(imageAngle);
   // var angle = (Math.PI*2) * (date.getSeconds()/60) - Math.PI/2,
   // imageAngle=imageAngle+angle;
   imageAngle++;
   context.scale(0.5,0.5);
   context.drawImage(image,-image.width/2,-image.height/2, image.width, image.height);
   
   
   
   //还原绘图环境
   context.restore();
}

function onImgLoad(){
   //创建图案对象
   pattern=context.createPattern(image,"repeat");
   //用setInterval定时器来启动时钟每秒走动刷新
   setInterval(drawClock, 1000);
 }

// Initialization................................................
function init(){
   context.font = FONT_HEIGHT + 'px Arial';
   //指定image图像对象来源
   image.src="images/ricky.PNG";
   //图像到达本地后触发load事件，做load事件注册
   image.onload=onImgLoad;
}
init();
