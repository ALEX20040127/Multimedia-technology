function Circle(x,y,r,startAngle,endAngle,clockwise){
    this.x=x||0;
    this.y=y||0;
    this.r=r||10;
    this.startAngle=startAngle||0;
    this.endAngle=endAngle||Math.PI*2;
    this.clockwise=clockwise||true;
}

Circle.prototype={
    x:0,
    y:0,
    r:10,
    startAngle:0,
    endAngle:Math.PI*2,
    clockwise:false,

    setCircleCord:function(x,y){
        this.x=x;
        this.y=y;
    },

    setCircleSize:function(r){
        if(r>=0) this.r=r;
       
    },

    setCircleAngle:function(startAngle,endAngle){
        this.startAngle=startAngle;
        this.endAngle=endAngle;
       
    },

    setCircleDirection:function(clockwise){
       this.clockwise=clockwise;
       
    },
    
    getCircleInfo:function(){
        return {
            x:this.x,
            y:this.y,
            r:this.r,
            startAngle:this.startAngle,
            endAngle:this.endAngle,
            clockwise:this.clockwise
        }
    }

}