function Rect(x,y,w,h){
    this.x=x||0;
    this.y=y||0;
    this.w=w||10;
    this.h=h||10;
}

Rect.prototype={
    x:0,
    y:0,
    w:10,
    h:10,

    setRectCord:function(x,y){
        this.x=x;
        this.y=y;
    },

    setRectSize:function(w,h){
        if(w>=0) this.w=w;
        if(h>=0) this.h=h;
    },

    getRectCord:function(){
        return {
            x:this.x,
            y:this.y
        }
    },

    getRectSize:function(){
        return{
            w:this.w,
            h:this.h
        }
    }
}