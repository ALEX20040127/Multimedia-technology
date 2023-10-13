var canvas=document.getElementById("myCanvas");//获取canvas对象
var context=canvas.getContext("2d");//通过canvas再获取绘图环境对象

function drawLine(x1,y1,x2,y2,color){
    context.beginPath();

    context.moveTo(x1,y1);//起始点坐标
    context.lineTo(x2,y2);//终止点坐标


    context.strokeStyle=color;
    context.lineWidth=5;

    context.stroke();
}


function onTimeOut(){
    context.font='50px sans-serif';
    context.fillStyle='red';
    context.textAlign='center';
    context.textBaseline='middle';
    
    
    context.fillText("hello world!", canvas.width/2, canvas.height/2);
}


function onCanvasClick(){//事件处理
    drawLine(0,canvas.height/2,canvas.width,canvas.height/2,'blue');
    drawLine(canvas.width/2,0,canvas.width/2,canvas.height,'green');
    setTimeout(onTimeOut,1000);
}

function Init(){
    //注册click事件,还没执行
    canvas.onclick=onCanvasClick;
}

Init();

