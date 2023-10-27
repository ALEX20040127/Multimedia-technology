function Circle(x,y,r,startAngle,endAngle,clockwise){
    //请参考Rect对象补充完整
    this.x=x||0;
    this.y=y||0;
    this.r=r||5;
    this.startAngle=startAngle||0;
    this.endAngle=endAngle||Math.PI*2;
    this.clockwise=clockwise||false;
}

Circle.prototype={
    //对象属性定义
    //【请补充】
    x:0,
    y:0,
    r:10,
    startAngle:0,
    endAngle:Math.PI*2,
    clockwise:false,

    setCircleCord:function(x,y){ //设置圆心
         //【请补充】
         this.x=x;
         this.y=y;
    },

    setCircleSize:function(r){ //设置圆大小
        //【请补充】
        if(r>=0)this.r=r;
    },

    setCircleAngle:function(startAngle,endAngle){ //设置圆的起始和终止弧度
        //【请补充】
        this.startAngle=startAngle;
        this.endAngle=endAngle;
    },

    setCircleDirection:function(clockwise){ //设置路径绘制方向
        //【请补充】
        this.clockwise=clockwise
    },

   
    getCircleInfo:function(){ //获取圆的参数信息
         //【请补充】
         return{
            x:this.x,
            y:this.y,
            r:this.r,
           startAngle:this.startAngle,
           endAngle:this.endAngle,
           clockwise:this.clockwise
         }
    }

}