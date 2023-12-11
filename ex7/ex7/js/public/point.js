function Point(x,y){
    this.x=x||0;
    this.y=y||0;
}

Point.prototype={
    x:0,
    y:0,
   

    setPoint:function(x,y){
        this.x=x;
        this.y=y;
    },

    
    getPoint:function(){
        return{
            x:this.x,
            y:this.y
        }
    }
}