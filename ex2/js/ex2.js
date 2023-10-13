let canvas=document.getElementById("myCanvas"); //获取canvas对象
let context=canvas.getContext("2d");  //获取绘图环境对象

//定义text对象
let text={
    text:"Hello World!",
    align:"center",
    baseline:"middle",
    x:canvas.width/2,
    y:canvas.height/2,
    font:"50px Arial"
}

function classEx1(){
    function onTimeout(){
        //调用functions.js中的drawText来绘制红色实心文本
        drawText(text,'red',true);
    }
    
    function onCanvasClick(){ //canvas的click事件处理函数
        //第1周案例写法
        // drawLine(0, canvas.height/2,canvas.width, canvas.height/2,'blue'); //函数调用
        // drawLine(canvas.width/2,0,canvas.width/2,canvas.height,'green');//画竖线

        // =========1 绘制水平横线=================================
        //创建line对象
        let line={
            x1:0, 
            y1:canvas.height/2,
            x2:canvas.width, 
            y2:canvas.height/2,
        }

        //利用functions.js中的drawLinePath()和putColorOnPath()函数绘制蓝色水平线段
        drawLinePath(line,true);
        putColorOnPath('blue',false);
        //===========2 绘制垂直竖线===================================
        line.x1=canvas.width/2;
        line.y1=0;
        line.x2=canvas.width/2;
        line.y2=canvas.height;
        //利用functions.js中的drawLinePath()和putColorOnPath()函数绘制绿色垂直线段
        drawLinePath(line,true);
        putColorOnPath('green',false);

        setTimeout(onTimeout,1000); //1秒钟后执行onTimeout
    }
   
    //===========3 注册click事件，非执行=================
    //【请补充】
    function init(){
        canvas.onclick=onCanvasClick;
    }

    init();
}


function classEx2(params) {

    let rect={ //矩形对象
        x:0,
        y:0,
        w:canvas.width,
        h:canvas.height
    }
    let flag=true; //四小块位置控制
    const MARGIN=10; //间距控制
    
    //=================1 定义随机色============================
    /**
     * 
     * @returns 随机色
     */
    function getRndColor(){
        let r=Math.random()*256;
        let g=Math.random()*256;
        let b=Math.random()*256;
        let a=Math.random();
        
        //利用rgba颜色函数生成随机色，并赋值给color变量
        let color=`rgba(${r},${g},${b},${a})`;
        //"rgba("+r+","+g+")
        return color;
    }

    //=================2 定义清屏函数============================
    function clear(){  //清屏
       //利用functions.js中的clearCanvas()函数来清屏
       clearCanvas(context,rect);
    }
    
    //=================3 定义绘制矩形函数============================
    function draw(){  //绘制随机色矩形
        //定义外框矩形位置和大小
        rect.x+=MARGIN; 
        rect.y+=MARGIN; 
        rect.w-=2*MARGIN;
        rect.h-=2*MARGIN;
        
        //绘制出口
        if(rect.h<=0 || rect.w<=0) { 
            text.text="GAME OVER!";
            drawText(text,getRndColor(),true);
            window.onkeydown=null; //移除事件注册
            return;
        }

        //利用functions.js中的drawRect()函数来绘制蓝色边框矩形
        drawRect(rect,'blue',false);
    
        //定义蓝框矩形中的第1个小矩形位置和大小
        let smallRect={ 
            x:rect.x+2, //2为左边距值
            y:rect.y+2, //2为上边距值
            w:rect.w/2-4, //4为左边距和右边距之和
            h:rect.h/2-4  //4为上边距和下边距之和
        }
        
        //循环执行绘制蓝框矩形中的4个随机色小矩形
        for(let i=1;i<=4;i++){ //绘制四小矩形
            //利用functions.js中的drawRectPath()函数来绘制小矩形路径
            drawRectPath(smallRect,true);
            //利用functions.js中的putColorOnPath()函数来对小矩形进行随机色填充
            putColorOnPath(getRndColor(),true);
            //定义后一个小矩形的位置
            if(flag){
                smallRect.x+=smallRect.w+2;
            }   
            else{
                smallRect.x=rect.x+2;
                smallRect.y+=smallRect.h+2;
            }
            flag=!flag;
        }
    }
    //定义键盘事件处理
    function onCanvasKeydown(e){ //注册keydown事件
        if(e.keyCode==13){  //回车键的ascii码值为13
            reDraw(); //执行重绘
        }
    }
    //重绘矩形
    function reDraw(){ 
        clear(); //清屏
        draw(); //绘制
    }
    function init(){ //ex2启动入口
        //canvas上出现蓝框矩形内包含四个随机色实心小矩形的画面
        draw();

        text.text="Press Enter!"; //提示信息绘制
        //利用functions.js中的drawText函数绘制随机色实心文本“Press Enter!”
        drawText(text,getRndColor(),true);

        
        //注册键盘的keydown事件
        window.onkeydown=onCanvasKeydown;

    }

    init(); //启动ex2
   
}


function init(){
    //    classEx1();  //第1周内容改写
       classEx2(); //第2周内容 
}

init();

