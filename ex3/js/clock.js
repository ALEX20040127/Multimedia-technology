/*
 * Copyright (C) 2012 David Geary. This code is from the book
 * Core HTML5 Canvas, published by Prentice-Hall in 2012.
 *
 * License:
 *
 * Permission is hereby granted, free of charge, to any person 
 * obtaining a copy of this software and associated documentation files
 * (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * The Software may not be used to create training material of any sort,
 * including courses, books, instructional videos, presentations, etc.
 * without the express written consent of David Geary.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
*/

var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    FONT_HEIGHT = 15,
    MARGIN = 35,
    HAND_TRUNCATION = canvas.width/25,
    HOUR_HAND_TRUNCATION = canvas.width/10,
    NUMERAL_SPACING = 20,
    RADIUS = canvas.width/2 - MARGIN,
    HAND_RADIUS = RADIUS - NUMERAL_SPACING;

var pattern;
//新建图像对象
var image=new Image();
// Functions.....................................................

function drawCircle() {
   context.beginPath();
   context.arc(canvas.width/2, canvas.height/2,
               RADIUS, 0, Math.PI*2, true);
   context.lineWidth=5;
   
   context.stroke();
}
   
function drawNumerals() {
   var numerals = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ],
       angle = 0,
       numeralWidth = 0;

   numerals.forEach(function(numeral) {
      angle = Math.PI/6 * (numeral-3);
      numeralWidth = context.measureText(numeral).width;
      context.fillText(numeral, 
         canvas.width/2  + Math.cos(angle)*(HAND_RADIUS) - numeralWidth/2,
         canvas.height/2 + Math.sin(angle)*(HAND_RADIUS) + FONT_HEIGHT/3);
   });
}

function drawCenter() {
   context.beginPath();
   context.arc(canvas.width/2, canvas.height/2, 5, 0, Math.PI*2, true);
   context.fill();
}

function drawHand(loc, isHour,lineWidth) {
   var angle = (Math.PI*2) * (loc/60) - Math.PI/2,
       handRadius = isHour ? RADIUS - HAND_TRUNCATION-HOUR_HAND_TRUNCATION 
                           : RADIUS - HAND_TRUNCATION;
   
   context.moveTo(canvas.width/2, canvas.height/2);
   context.lineTo(canvas.width/2  + Math.cos(angle)*handRadius, 
                  canvas.height/2 + Math.sin(angle)*handRadius);
   context.lineWidth=lineWidth;
   context.stroke();
}

function drawHands() {
   var date = new Date,
       hour = date.getHours();
   hour = hour > 12 ? hour - 12 : hour;
   drawHand(hour*5 + (date.getMinutes()/60)*5, true,3);
   drawHand(date.getMinutes(), false,1);
   drawHand(date.getSeconds(), false,1);
}

function drawClock() {
   context.clearRect(0,0,canvas.width,canvas.height);
   // 图案绘制
   //保存绘图环境
   context.save();
   //设置图案为填充属性  
   context.fillStyle=pattern;  
   //平移坐标系到中心
   context.translate(canvas.width/2-image.width/2,canvas.height/2-image.height/2);  //改变坐标原点,坐标系平移
   //绘制填充图案的矩形（显示图像）
   context.fillRect(0,0,image.width,image.height);
   //还原绘图环境
   context.restore();
   
   drawCircle();
   drawCenter();
   drawHands();
   drawNumerals();
}
function onImgLoad(){
   //创建图案对象
   pattern=context.createPattern(image,"no-repeat");
   loop = setInterval(drawClock, 1000);
 }

// Initialization................................................
function init(){
   context.font = FONT_HEIGHT + 'px Arial';
   
   //指定图像来源
   image.src="images/micky.jpeg";
   //图像到达本地后load事件触发，表示图像可用
   image.onload=onImgLoad;
   
}
init();
