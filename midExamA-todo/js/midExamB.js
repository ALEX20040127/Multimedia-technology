/**
 * Module:期中考试
 * Description:1)加载后显示文本“博尔赫斯短篇小说”（START_TEXT），
 *               字体大小为START_FONT_HEIGHT，线宽为TEXT_LINE_WIDTH，用图案（PATTERN_IMAGE）填充文本，
 *               要求canvas的背景填充样式为线性渐变对象，上下渐变式样，
 *               渐变开始颜色为START_COLOR，中部颜色为END_COLOR，尾部颜色和开始颜色相同；
 * 
 *             2）单击canvas后，canvas出现逐渐变大的图案（PATTERN_IMAGE）填充圆，
 *                圆的半径从START_RADIUS开始，每次增加RADIUS_STEP，直到半径大于canvas高度的一半后结束动画，
 *                动画间隔为INTERVAL；
 * 
 *             3）旋转动画结束后，canvas绘制带透明度（ALPHA）的图像，并绘制倒过来的绿色（STROKE_COLOR）描边白色（FILL_COLOR）填充文本“小径分叉的花园”（END_TEXT）
 *                文本大小为END_FONT_HEIGHT。
 *             
 *           【注意】1）canvas宽度为CANVAS_WIDTH，高度为CANVAS_HEIGHT
 *                  2）题目中出现的常量名都可以用
 *                  3）运行效果可参考 demo
 * 
 *           【上交】1）保存本文件后，整个文件夹打包后作为附件上传
 *                  2）考试结束前尽早提交，留足上交时间，最起码要2分钟左右上交，
 *                    考试快结束时，上交人太多，可能会出现网卡现象。
 * 
 * Author:周 二 班-吴雨非
 * Build-Date:2023-11-22
 * 
 */

//题目中用到的常量定义
const INTERVAL=200;
const START_TEXT="博尔赫斯短篇小说";
const END_TEXT="小径分叉的花园";
const CANVAS_WIDTH=651;
const CANVAS_HEIGHT=414;
const PATTERN_IMAGE="images/wallpaper.jpg";
const START_FONT_HEIGHT=72;
const END_FONT_HEIGHT=60;
const TEXT_LINE_WIDTH=5;
const START_RADIUS=5;
const RADIUS_STEP=20;
const ALPHA=0.34;
const START_COLOR='rgba(0,0,255,0.2)';
const END_COLOR='#fff';
const STROKE_COLOR="green";
const FILL_COLOR="white";

//全局变量定义，可根据需要增加
var canvas,context;
var r=START_RADIUS;
var textStart = new Text();
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext('2d');
var img = new Image();
//======函数定义区========================================
// 除了这三个主要函数外，可以再添加别的函数，
// public文件夹下js文件提供的函数和对象都可以用
function scene1(){   //场景1绘制
   // 设置背景填充样式为线性渐变
  setLinearGradient();

  // 设置文本样式
  textStart.text = START_TEXT;
  textStart.point.x = canvas.width/2;
  textStart.point.y = canvas.height/2;
  textStart.props.font = START_FONT_HEIGHT + "px Arial";
  context.lineWidth = TEXT_LINE_WIDTH;
  context.strokeStyle = "transparent"; 

  img.src = PATTERN_IMAGE;
  img.onload = function () {
    var fillStyle = context.createPattern(img, "repeat");
    drawText(context,textStart,fillStyle,true);
  };
}

function scene2(){  //场景2绘制
      // 清空画布
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

   //绘制背景
  setLinearGradient();

  // 绘制圆形
  // context.beginPath();
  context.arc(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, r, 0, Math.PI * 2);
  context.closePath();


  // 设置填充样式为图案
  var pattern = context.createPattern(new Image(), "repeat");
  var img = new Image();
  img.src = PATTERN_IMAGE;
  img.onload = function () {
    pattern = context.createPattern(img, "repeat");
    context.fillStyle = pattern;
    context.fill();

    // 更新半径
    r += RADIUS_STEP;

    // 判断是否继续动画
    if (r <= CANVAS_HEIGHT / 2) {
      setTimeout(scene2, INTERVAL);
    } else {
      scene3();
    }
  };
}

function scene3(){  //场景3绘制
     // 清空画布
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // 绘制图像
  var img = new Image();
  img.src = PATTERN_IMAGE;
  img.onload = function () {
   context.save();
    context.globalAlpha = ALPHA;    
    context.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
   context.restore();
   
    var circle = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      r: CANVAS_HEIGHT/2,
      startAngle: 0,
      endAngle: Math.PI * 2,
      clockwise: true
    };
    var pattern = context.createPattern(new Image(), "repeat");
    drawCirclePath(context, circle, true, true);
    pattern = context.createPattern(img, "repeat");
    context.fillStyle = pattern;
    context.fill();

    // 绘制文本
    context.font = END_FONT_HEIGHT + "px Arial";
    context.lineWidth = TEXT_LINE_WIDTH;
    context.scale(-1, -1);
    
    context.strokeStyle = STROKE_COLOR;
    context.fillStyle = FILL_COLOR;
    context.fillText(END_TEXT, -canvas.width/2, -CANVAS_HEIGHT / 2);
    context.strokeText(END_TEXT, -canvas.width/2, -CANVAS_HEIGHT / 2);
  };
}

//======事件处理函数定义========================================
// 此处定义事件处理函数
function onCanvasMouseClick(){
   scene2();
}

function setLinearGradient(){
   var gradient = context.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
  gradient.addColorStop(0, START_COLOR);
  gradient.addColorStop(0.5, END_COLOR);
  gradient.addColorStop(1, START_COLOR);
  context.fillStyle = gradient;
  // 填充背景
  context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

//========init=================================================
function init(){
   scene1();
   canvas.onclick= onCanvasMouseClick;
}
init();  //程序入口