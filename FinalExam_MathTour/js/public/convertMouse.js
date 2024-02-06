/**
 * @function 当前文档坐标系的鼠标点坐标转换到canvas坐标系的值
 * @author public
 * @param {Object} canvas 当前操作的canvas对象
 * @param {Object} point 转换的鼠标点
 * @returns {Object} point 转换后的鼠标点坐标
 */
 

function convertWindowToCanvas(canvas,point){
    var canvasStyle=window.getComputedStyle(canvas);
    var bbox=canvas.getBoundingClientRect();
    var xRatio=0,yRatio=0;
    
    point.x-=parseFloat(bbox.left);
    point.y-=parseFloat(bbox.top);
   
    point.x-=parseFloat(canvasStyle["border-left-width"]);
    point.y-=parseFloat(canvasStyle["border-top-width"]);

    point.x-=parseFloat(canvasStyle["padding-left"]);
    point.y-=parseFloat(canvasStyle["padding-top"]);

    xRatio=canvas.width/parseFloat(canvasStyle["width"]);
    yRatio=canvas.height/parseFloat(canvasStyle["height"]);

    point.x*=xRatio;
    point.y*=yRatio;

    return point;

}


