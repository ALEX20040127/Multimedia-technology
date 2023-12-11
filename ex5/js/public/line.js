function Line(x1,y1,x2,y2){
    this.x1=x1||0;
    this.y1=y1||0;
    this.x2=x2||10;
    this.y2=y2||10;
}

Line.prototype={
    x1:0,
    y1:0,
    x2:10,
    y2:10,

    setStartPoint:function(x1,y1){
        this.x1=x1;
        this.y1=y1;
    },

    setEndPoint:function(x2,y2){
        if(Math.abs(this.x1-x2)>0 || this.x1==x2 && this.y1!=y2) this.x2=x2;  //有效线段
        if(Math.abs(this.y1-y2)>0 || this.y1==y2 && this.x1!=x2) this.y2=y2;
    },

   
    getLineInfo:function(){
        return{
            x1:this.x1,
            y1:this.y1,
            x2:this.x2,
            y2:this.y2
        }
    }
}