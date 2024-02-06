/*
	Function  :snow
	Author    :周x班-xxx
	Build_Date:2023-12-18
	Version   :0.5
 */

//1. 公共变量声明块........................................................
const INTERVAL=300;
const SNOWGUY_MARGIN=30,
	FONT_SIZE=120;

var canvas=document.getElementById("canvas"),
	context=canvas.getContext("2d");
var image=new Image();
var snowImage=new Image();
var lastTime=0,
	arrSnow=[],
	i=0;
var lastUpdateTime=+new Date();

//【请填写】声明淡入的背景精灵，背景图像为images/snow.jpg，行为为behaviors.js中的fadeIn（淡入）
//=======1===========
var backgroundSprite = new Sprite('background', new ImagePainter('images/snow.jpg'));

backgroundSprite.behaviors.push(fadeIn);


//雪花飘落行为对象
var drop = {
       angle:Math.PI/5,
       
       execute: function (sprite, context) {

         this.angle=Math.random()*Math.PI;

		 //更新精灵（Sprite）的位置
         sprite.left += sprite.velocityX*Math.cos(this.angle);
         sprite.top += sprite.velocityY*Math.sin(this.angle);
            
       }
    },

    //雪花绘制器
    snowPainter ={
    	radious:this.radious||1,

    	paint: function(sprite,context){
    		context.save();
    		
    		context.beginPath();
			//绘制雪花圆形外观【请填写】
    		//=======2===========
			context.arc(sprite.left+sprite.width/2, sprite.top+sprite.width/2, this.radious, 0, Math.PI * 2, false);

    		context.fillStyle = "rgba(254,254,254,0.8)";
    		context.fill();
    		context.closePath();
    		
    		context.restore();
    	}
    };
    
//2. 函数定义块...........................................................
function makeSnow(){
	i=arrSnow.length;
	// 声明新的雪花精灵对象，绘制器为snowPainter对象，行为为drop对象【请填写】
	//=======3===========

	// 设置雪花不同分量的速度
	snow.velocityX=5;
	snow.velocityY=parseInt(Math.PI*5)+1;
	// 设置雪花的x为[0,canvas.width]的随机值
	//=======4===========
	
	//设置雪花的位置从顶部开始，y为0【请填写】
	//=======5===========

	// 设置雪花的宽度为[1,8]的随机值【请填写】
	//=======6===========

	// 设置雪花精灵的绘制器的x,y,radious值
	snow.painter.x=snow.left;
	snow.painter.y=snow.top;
	snow.painter.radious=snow.width/2;
	
	// canvas上绘制雪花精灵【请填写】
	//=======7===========
	
	// 雪花精灵添加到arrSnow数组中
	arrSnow.push(snow);

}

function animate(time){
	
	if(time-lastTime>INTERVAL){
		// 清屏
		context.clearRect(0,0,canvas.width,canvas.height);
		// 重绘背景
		drawBackground();
		// 重绘雪人
		drawSnowguy();
		// 重绘文本
		drawText("Merry Christmas!");

		// 循环重绘数组中的雪花
		i=arrSnow.length;
		while(i--){
			// 遍历数组中的雪花
			var snow=arrSnow[i];

			//设置雪花绘制器的半径【请填写】
			//=======8===========

			//更新和重绘雪花精灵【请填写】
			//=======9===========
	
			// 飘落的雪花位置超出canvas后，从数组删除雪花
			if(snowPainter.y>canvas.height||snowPainter.x>canvas.width||snowPainter.x<0){
				arrSnow.splice(i,1);
			}
			
		}
		// 记录此次时间
		lastTime=time;
		// 生成新的雪花点【请填写】
		//=======10===========
		
	}
	// 执行雪花飘的动画循环【请填写】
	//=======11===========

}

function drawBackground(){
	context.drawImage(image,0,0);
}

function drawSnowguy(){
	time=+new Date();
	
	if(snowImage.complete && (time-lastUpdateTime)>=500){
		w=snowImage.width/2;
		h=snowImage.height/2;
		x=canvas.width-w-SNOWGUY_MARGIN*2;
		y=canvas.height-h-SNOWGUY_MARGIN*1.5;
		
		context.drawImage(snowImage,x,y,w,h);
		context.drawImage(snowImage,canvas.width-w-snowImage.width,
								canvas.height-snowImage.height-SNOWGUY_MARGIN);
		
	}
	else{
		snowImage.onload=function(){
			w=snowImage.width/2;
			h=snowImage.height/2;
			x=canvas.width-w-SNOWGUY_MARGIN*2;
			y=canvas.height-h-SNOWGUY_MARGIN;
			context.drawImage(snowImage,x,y,w,h);
		}
	}
}
function drawText(content){
	context.save();

	context.fillStyle = "rgba(255,255,255,0.7)";
	context.lineWidth = "5px";
	context.strokeStyle = "white";
	context.font = FONT_SIZE+"px Blackadder ITC";
	context.textBaseline = "middle";
	w=context.measureText(content).width;
	x=canvas.width/2-w/2;
	y=canvas.height/2-FONT_SIZE;
	context.translate(x, y);
	context.fillText(content, 0, 0);
	context.strokeText(content, 0,0);

	context.restore();
}

function bgLoading(time){
	context.clearRect(0, 0, canvas.width, canvas.height);

	bg.update(context,time);
	bg.paint(context);
	
	if(context.globalAlpha < 1) {
		//执行背景淡入动画【请填写】
		//=======12===========
	}	
	else{
		drawSnowguy();
		makeSnow();
		//启动雪花飘的动画【请填写】
		//=======13===========
	}
	
}
//4. 初始化块............................................................
function init(){
	image.src="images/snow.jpg";
	snowImage.src="images/snow-guy.png";
	context.globalAlpha=0;
	drawBackground();
	//启动背景淡入的动画【请填写】
	//=======14===========
}
init();

	