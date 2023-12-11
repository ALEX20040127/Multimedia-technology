function Point(x,y){
   //【请补充】
   this.x = x||0;
   this.y = y||0;
}

Point.prototype={
    //【请补充属性】
   x:0,
   y:0,
   //【请补充setPoint 方法来设置点的x,y属性值】
   setPoint:function(x,y){
        this.x = x;
        this.y = y;
   },

    //【请补充getPoint 方法来获取点的x,y属性值，返回对象形式】
   getPoint:function(){
        return{
           x:this.x,
           y:this.y 
        }
   }
}