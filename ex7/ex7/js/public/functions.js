/**
 * 给出亮点和颜色绘制直线
 * @param {Object} context 绘制的目标canvas 
 * @param {Number} x1 
 * @param {Number} y1 
 * @param {Number} x2 
 * @param {Number} y2 
 * @param {String} color 
 */
function drawLine(context,x1,y1,x2,y2,color){  //定义划线函数
    context.beginPath();  //开启新路径
    
    //1 直线路径
    context.moveTo(x1,y1);  //起始点坐标
    context.lineTo(x2,y2);  //终止点坐标

    //2 直线着色
    context.strokeStyle=color;
    context.lineWidth=5;

    context.stroke();
}



/**
 * 绘制线段路径
 * @param {Object} context 绘制的目标canvas
 * @param {Object} line 包含绘制线段的起始点(x1,y1)和终止点(x2,y2)
 * @param {*} isNewPath 是否开启新路径  是否开启新路径，true/1表示开启，反之不开启
 */
function drawLinePath(context,line,isNewPath){
    if(isNewPath) context.beginPath();
    //1 直线路径
    context.moveTo(line.x1,line.y1);  //起始点坐标
    context.lineTo(line.x2,line.y2);  //终止点坐标

}
/**
 * 绘制文本
 * @param {Object} context 绘制的目标canvas
 * @param {Object} text 包括字体及大小的font，起始点水平对齐align，起始点垂直基线baseline，起始点坐标(x,y)等信息
 * @param {String} style 填充色/描边色/其他样式
 * @param {Number} isFill 是否填充，true/1表示填充，反之描边
 */
function drawText(context,text,style,isFill) {
    context.font=text.props.font; //设置字体大小
    context.textAlign=text.props.align;
    context.textBaseline=text.props.baseline;
    if(isFill){
        context.fillStyle=style;
        context.fillText(text.text, text.point.x,text.point.y); //绘制填充文本
    }else{
        context.strokeStyle=style;
        context.strokeText(text.text, text.point.x,text.point.y); //绘制描边文本
    }
}

/**
 * 根据矩形信息绘制矩形
 * @param {Object} context 绘制的目标canvas
 * @param {Object} rect 包括绘制起始点坐标(x,y)、宽度width和高度height信息
 * @param {String} style 填充色/描边色/其他样式
 * @param {Boolean} isFill  是否填充，true/1表示填充，反之描边
 */
function drawRect(context,rect,style,isFill) {
    if(isFill){
        context.fillStyle=style;
        context.fillRect(rect.x,rect.y,rect.w,rect.h);
    }else{
        context.strokeStyle=style;
        context.strokeRect(rect.x,rect.y,rect.w,rect.h);
    }
}

/**
 * 绘制矩形路径
 * @param {Object} context 绘制的目标canvas
 * @param {Object} rect 包括绘制起始点坐标(x,y)、宽度width和高度height信息
 * @param {*} isNewPath 是否开启新路径  是否开启新路径，true/1表示开启，反之不开启
 */
function drawRectPath(context,rect,isNewPath) {
   if(isNewPath) context.beginPath();
   context.rect(rect.x, rect.y, rect.w, rect.h);
}

/**
 * 设置路径样式
 * @param {Object} context 绘制的目标canvas
 * @param {String} style 填充色/描边色/其他样式
 * @param {Number} isFill  是否填充，true/1表示填充，反之描边
 */
function putColorOnPath(context,style,isFill) {
    if(isFill){
        context.fillStyle=style;
        context.fill(); 
    }else{
        context.strokeStyle=style;
        context.stroke();
    }
}

/**
 * 清除指定大小的canvas
 * @param {Object} context 绘制的目标canvas
 * @param {*} context 指定要清除的canvas
 * @param {*} rect 指定要清除的矩形大小，包括起始点(x,y)和宽度w，高度h的信息
 */
function clearCanvas(context,rect) {
    context.clearRect(rect.x, rect.y, rect.w, rect.h);   
}



/**
 * 绘制圆形路径
 * @param {Object} context 绘制的目标canvas
 * @param {Object} cirle包括绘制圆心坐标(x,y)、半径r、起始弧度startAngle、终止弧度endAngle和是否顺时针clockwise信息
 * @param {Boolean} isNewPath 是否开启新路径  是否开启新路径，true/1表示开启，反之不开启
 * @param {Boolean} isClosePath 是否闭合路径 true/1表示闭合，反之不闭合
 */
function drawCirclePath(context,circle,isNewPath,isClosePath){
    if(isNewPath) context.beginPath();
    context.arc(circle.x,circle.y,circle.r,circle.startAngle,circle.endAngle,circle.clockwise);
    if(isClosePath) context.closePath();
}

/**
 * 绘制图像
 * @param {Object} context 绘制的目标canvas
 * @param {Object} image 绘制的图像对象
 * @param {Object} rect 绘制图像的起始点坐标（x,y)和图像大小w和h 
 */
function drawImg(context,image,rect){
    if(image!==undefined && rect!==undefined) 
        context.drawImage(image, rect.x, rect.y, rect.w, rect.h);
}

/**
 * 设置路径阴影
 * @param {Object} context 绘制的目标canvas
 * @param {String} color  阴影颜色
 * @param {*} offsetX 
 * @param {*} offsetY 
 * @param {*} blur 
 */
function putShadowOnPath(context,color,offsetX,offsetY,blur) {
    if(blur!==undefined) context.shadowBlur=blur;
    if(color!==undefined) context.shadowColor=color;
    if(offsetX!==undefined) context.shadowOffsetX=offsetX;
    if(offsetY!==undefined) context.shadowOffsetY=offsetY;
    
}

////////////////////////////////////////////////////////////////
function getCanvas(id){
    let canvas=document.getElementById(id);
    return canvas;
}

function getContext(canvas){
    let context=canvas.getContext("2d",{ willReadFrequently: true });
    return context;
};

function createLinearGradient(context,rect){
    return context.createLinearGradient(rect.x,rect.y,rect.w,rect.h);
}

function createRadialGradient(context,circle1,circle2){
   return context.createRadialGradient(circle1.x,circle1.y,circle1.r,circle2.x,circle2.y,circle2.r);
}

/////////////////////////////////////////////////////////
function createCanvas(){
    let canvas=document.createElement("canvas");
    return canvas;
}