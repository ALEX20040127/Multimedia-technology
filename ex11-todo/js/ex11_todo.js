/*
	Functions  :ex11 天空滚动精灵版
	Author    :教学班-姓名
	Build_Date:2023-12-x
	Version   :1.0
 */

var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    controls = document.getElementById('controls'),
    animateButton = document.getElementById('animateButton'),

    paused = true,
    lastTime = 0,
    lastFpsUpdate = { time: 0, value: 0 },
    fps = 60;

//定义图像大小
var SKY_WIDTH=1024,
    SKY_HEIGHT=512;

var audio=document.getElementById("bgAudio");  //获取音频对象


//定义天空精灵行为
var scroll={
  lastUpdate: 0,  //记录更新时间
  offset : 0, //天空图像移动偏移量
  VELOCITY : 8, //天空的滚动速度
  //【请填写】定义行为的execute方法 
  //==========1============
  execute: function (deltaTime) {
   // 计算时间间隔
   var elapsed = deltaTime - this.lastUpdate;

   // 根据时间间隔和速度计算偏移量
   this.offset += this.VELOCITY * (elapsed / 1000);

   // 更新最后更新时间
   this.lastUpdate = deltaTime;
 }
}

// 【请填写】声明天空图像绘制器
// ========2=========
var skyDrawer = {
   draw: function (sprite) {
     context.drawImage(
       sprite.image,
       sprite.left,
       sprite.top,
       sprite.width,
       sprite.height
     );
   }
 };
 
// 声明天空图像的精灵（sprite）
//【请填写】绘制器是第2步声明的图像绘制器，行为是scroll
//=======3========
function initSprite(sprite) {
   sprite.left = 0;
   sprite.top = 0;
 
   skyDrawer.draw(sprite); // 绘制天空精灵
 }
    
// Functions.....................................................
// 擦除canvas
function erase(context) {
   context.clearRect(0,0,canvas.width,canvas.height);
}

//精灵对象初始显示
function initSprite(sprite){
      sprite.left=0;
      sprite.top=0;
    //  【请填写】 绘制天空精灵
    //  ======4======
}

function calculateFps(now){
   let fps=60;
   if(now===undefined) now= + new Date();
   //【请填写】计算帧频
   //======5========
   return fps;
}

function animate(now) {
   if (now === undefined) {
      now = +new Date;
   }
   //【请填写】变量fps获取到帧频
   //=======6==========
   if (!paused) {  //播放开始刷新精灵状态并绘制
      erase(context);
      //【请填写】更新并重绘天空精灵，保持天空滚动连续
      //========7=========   
     
   }
    //【请填写】保持动画循环    
    //========8=========   
}



// Event handlers................................................

animateButton.onclick = function (e) {
   paused = !paused;
   if (paused) {
      //【请填写】//修改input[type='button']的按钮提示信息为"Animate"
      //=======9=======

      //【请填写】暂停声音播放
      //=======10=======
   }
   else {
      //【请填写】修改input[type='button']的按钮提示信息为"pause"
      //=======11==========
      
      //【请填写】播放声音
      //=======12==========

   }
};

// Initialization................................................
function init() {
   //初始化精灵
    initSprite(skySprite);
    //【请填写】启动动画
    // ========13==========
 }
init();


