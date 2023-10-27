var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');
var weatherInfo = document.getElementById('weather'),
    wcontext = weatherInfo.getContext('2d');

var FONT_HEIGHT = 30,
    MARGIN = 10,
    HAND_TRUNCATION = canvas.width/25,
    HOUR_HAND_TRUNCATION = canvas.width/10,
    NUMERAL_SPACING = 30,
    RADIUS = canvas.width/2 - MARGIN,
    HAND_RADIUS = RADIUS - NUMERAL_SPACING;
    SHADOWCOLOR = "pink";
    PATHCOLOR = "LightBlue";
    HOUR_HAND_COLOR = "deeppink"
    HAND_COLOR = "SlateGray"
    NUMERAL_COLOR="SlateGray"
//变量定义
//【请补充】

var pattern;
var image=new Image();
var circle1=new Circle(canvas.width/2,canvas.height/2,RADIUS,0,Math.PI*2,false);
var circle2=new Circle(canvas.width/2,canvas.height/2,5,0,Math.PI*2,false);   
var rect1=new Rect(0,0,canvas.width,canvas.height);
let props={
      align:"center",
      baseline:"middle",
      font:"bold 30px Arial"
};
let point={
      x:canvas.width/2,
      y:canvas.height/2
};
var text=new Text("1",props,point);
var line=new Line(canvas.width/2,canvas.height/2,canvas.width,canvas.height);
var imageAngle=0;
// Functions.....................................................
//绘制钟的外圆
function drawCircle() {
   context.save();
   //调用functions.js中的drawCirclePath函数和circle对象绘制圆路径
   //请补充
   context.lineWidth=15;
   drawCirclePath(context,circle1,true,circle1.clockwise);

   //调用functions.js中的putShadowOnPath函数设置阴影 
   //请补充
   putShadowOnPath(context,SHADOWCOLOR,0,0,20);
   //调用functions.js中的putColorOnPath函数用默认色描边圆路径
   //请补充
   putColorOnPath(context,PATHCOLOR,false);

   context.restore();
}
   
function drawNumerals() {
   //调用functions.js中的drawText函数和text对象绘制时钟上的数字
   //请补充
   var numerals = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ],
       angle = 0,
       numeralWidth = 0;

   numerals.forEach(function(numeral) {
      angle = Math.PI/6 * (numeral-3);
      numeralWidth = context.measureText(numeral).width;

      //调用functions.js中的drawText函数绘制时钟上的数字
      text.text=numeral;
      text.point.x=canvas.width/2  + Math.cos(angle)*(HAND_RADIUS) ;
      text.point.y=canvas.height/2 + Math.sin(angle)*(HAND_RADIUS) + FONT_HEIGHT/4;
      drawText(context,text,NUMERAL_COLOR,1);
      
   });
}

function drawCenter() {
   
    //调用functions.js中的drawCirclePath函数和circle对象绘制钟面中心点的圆路径
     drawCirclePath(context,circle2,true,circle2.clockwise);
    //调用functions.js中的putColorOnPath函数用默认色填充
    putColorOnPath(context,"black",1);
}

function drawHand(loc, isHour,lineWidth) {
   var angle = (Math.PI*2) * (loc/60) - Math.PI/2,
       handRadius = isHour ? RADIUS - HAND_TRUNCATION-HOUR_HAND_TRUNCATION 
                           : RADIUS - HAND_TRUNCATION;
   
    //调用functions.js中的drawLinePath函数绘制指针路径
    line.x2=canvas.width/2  + Math.cos(angle)*handRadius;
    line.y2=canvas.height/2 + Math.sin(angle)*handRadius;
    drawLinePath(context,line,true);

   context.lineWidth=lineWidth;
    //调用functions.js中的putColorOnPath函数用描边指针线段
    if(isHour){
      putColorOnPath(context,HOUR_HAND_COLOR,0);
    }else{
      putColorOnPath(context,HAND_COLOR,0);
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
   clearCanvas(context,rect1);

   // 图案绘制
   drawClockPattern();
   
   drawCircle();
   drawCenter();
   drawHands();
   drawNumerals();
   drawDot();
   drawDate();
}

//绘制钟面图像
function drawClockPattern(){
    //保存绘图环境
   context.save();

   //平移坐标系，让图像的中心点可以和canvas中心点吻合
   //【请补充】
   context.translate(canvas.width/2, canvas.height/2);

   
   //让钟面中心的图像围绕canvas的中心点旋转起来，并且图像要缩小到原来的一半
   //【请补充】
   context.rotate(imageAngle);
   context.scale(0.5, 0.5);
   
   imageAngle++;
   //调用functions.js中的drawImg函数和Rect、Image对象来绘制钟面的旋转图像
   //【请补充】
   // context.drawImage(image, 0, 0, image.width, image.height);
   var rect2=new Rect(-image.width/2,-image.height/2,image.width,image.height);
   drawImg(context,image,rect2);
   //还原绘图环境
   context.restore();
}

function onImgLoad(){
   
   //用setInterval定时器来启动时钟每秒走动刷新
   setInterval(drawClock,1000);
 }
function drawWeatherInfo(){
   drawCurrentWeather();
   // setInterval(drawCurrentWeather, 600000); // 例如，每隔10分钟更新一次天气信息
}
// Initialization................................................
function init(){

   //初始化定义对象的属性
   pattern=context.createPattern(image, "repeat");
 
   //指定image图像对象来源
   image.src="static/images/ricky.PNG";
   playTickSound();
   //图像到达本地后触发load事件，做load事件注册
   image.onload=onImgLoad;
   drawWeatherInfo();
   
}
init();
