/*
	Functions  :ex11-1 天空滚动精灵版（仅供参考）
	Author    : zjvivi
	Build_Date:2021-11-30
	Version   :1.0
 */

var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
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
  lastUpdate: 0,
  offset : 0,
  VELOCITY : 8,

  execute: function (sprite,context,fps) {  //定义行为对象约定的execute方法
    
    this.offset = this.offset < sprite.width ?
               this.offset + this.VELOCITY/fps : 0;
    sprite.left=-this.offset;
  }
}


var skyPainter=new ImagePainter("images/sky.png");
  
var skySprite=new Sprite("skySprite",skyPainter,[scroll]);
    
// Functions.....................................................

function erase(context) {
   context.clearRect(0,0,canvas.width,canvas.height);
}

//精灵对象初始显示
function initSprite(sprite){
      sprite.left=0;
      sprite.top=0;
      sprite.width=SKY_WIDTH;
      sprite.height=SKY_HEIGHT;
      sprite.paint(ctx);  
}


function calculateFps(now){
   let fps=60;
   if(now===undefined) now= + new Date();
   fps=parseInt(1000/(now-lastTime));
   return fps;
}

function animate(now) {
   if (now === undefined) {
      now = +new Date;
   }
   
   fps=calculateFps(now);
  
   if (!paused) {  //播放开始刷新精灵状态并绘制
      erase(ctx);
      drawRoles(skySprite,fps);
     
   }
   
   lastTime=now;
   requestNextAnimationFrame(animate);
}

function drawRoles(sprite,fps){
      sprite.update(ctx,fps);  //定义精灵行为，更新精灵状态
      sprite.paint(ctx);       //绘制精灵对象
      sprite.left+=sprite.width-2;  //设置后一张接着的图像的位置，在此采用共享一个精灵的享元模式
      sprite.paint(ctx);       //绘制后一张图像
}

// Event handlers................................................

animateButton.onclick = function (e) {
   paused = !paused;
   if (paused) {
      animateButton.value = 'Animate';  //修改input[type='button']的按钮显示
      audio.pause();
   }
   else {
      animateButton.value = 'Pause';  //修改input[type='button']的按钮显示
      audio.play();
   }
};

// Initialization................................................
function init() {
   initSprite(skySprite);
   requestNextAnimationFrame(animate);
 }
init();


