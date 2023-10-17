/**
 * 给出亮点和颜色绘制直线
 * @param {Number} x1 
 * @param {Number} y1 
 * @param {Number} x2 
 * @param {Number} y2 
 * @param {String} color 
 */
function drawLine(x1,y1,x2,y2,color){  //定义划线函数
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
 * @param {Object} line 包含绘制线段的起始点(x1,y1)和终止点(x2,y2)
 * @param {*} isNewPath 是否开启新路径  是否开启新路径，true/1表示开启，反之不开启
 */
function drawLinePath(line,isNewPath){
    if(isNewPath) context.beginPath();
    //1 直线路径
    context.moveTo(line.x1,line.y1);  //起始点坐标
    context.lineTo(line.x2,line.y2);  //终止点坐标

}
/**
 * 绘制文本
 * @param {Object} text 包括字体及大小的font，起始点水平对齐align，起始点垂直基线baseline，起始点坐标(x,y)等信息
 * @param {String} style 填充色/描边色/其他样式
 * @param {Number} isFill 是否填充，true/1表示填充，反之描边
 */
function drawText(text,style,isFill) {
    context.font=text.font; //设置字体大小
    context.textAlign=text.align;
    context.textBaseline=text.baseline;
    if(isFill){
        context.fillStyle=style;
        context.fillText(text.text, text.x,text.y); //绘制填充文本
    }else{
        context.strokeStyle=style;
        context.strokeText(text.text, text.x,text.y); //绘制描边文本
    }
}

/**
 * 根据矩形信息绘制矩形
 * @param {Object} rect 包括绘制起始点坐标(x,y)、宽度width和高度height信息
 * @param {String} style 填充色/描边色/其他样式
 * @param {Boolean} isFill  是否填充，true/1表示填充，反之描边
 */
function drawRect(rect,style,isFill) {
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
 * @param {Object} rect 包括绘制起始点坐标(x,y)、宽度width和高度height信息
 * @param {Boolean} isNewPath 是否开启新路径  是否开启新路径，true/1表示开启，反之不开启
 */
function drawRectPath(rect,isNewPath) {
   if(isNewPath) context.beginPath();
   context.rect(rect.x, rect.y, rect.w, rect.h);
}

/**
 * 
 * @param {String} style 填充色/描边色/其他样式
 * @param {Number} isFill  是否填充，true/1表示填充，反之描边
 */
function putColorOnPath(style,isFill) {
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
 * @param {*} context 指定要清除的canvas
 * @param {*} rect 指定要清除的矩形大小，包括起始点(x,y)和宽度w，高度h的信息
 */
function clearCanvas(context,rect) {
    context.clearRect(rect.x, rect.y, rect.w, rect.h);   
}


/**
 * 绘制圆形路径
 * @param {Object} cirle包括绘制圆心坐标(x,y)、半径r、起始弧度startAngle、终止弧度endAngle和是否顺时针clockwise信息
 * @param {Boolean} isNewPath 是否开启新路径  是否开启新路径，true/1表示开启，反之不开启
 * @param {Boolean} isClosePath 是否闭合路径 true/1表示闭合，反之不闭合
 */
function drawCirclePath(circle,isNewPath,isClosePath){
    //【请补充】
    
}