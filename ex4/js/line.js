function Line(x1,y1,x2,y2){  //参考Rect对象定义Line对象
   this.x1=x1||0;
   this.y1=y1||0;
   this.x2=x2||5;
   this.y2=y2||5;
}

Line.prototype={
   x1:0,
   x2:0,
   y1:5,
   y2:5,

   setStartPoint:function(x1,y1){
    this.x1=x1;
    this.y1=y1;
   },

   setEndPoint:function(x2,y2){
    this.x2=x2;
    this.y2=y2;
   },
   
   getStartPoint:function(){
    return{
        x1:this.x1,
        y1:this.y1
    }
   },

   getEndPoint:function(){
    return{
        x2:this.x2,
        y2:this.y2
    }
   }
}