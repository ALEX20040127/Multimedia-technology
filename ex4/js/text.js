function Text(text,props,point){ //参考Rect对象定义Text对象
    let defaultProps={
        align:"center",
        baseline:"middle",
        font:"12px Arial"
    };
    let defaultPoint={
        x:canvas.width/2,
        y:canvas.height/2
    };
    
    this.text=text||"";
    this.props=props|| defaultProps;
    this.point=point||defaultPoint;
    
}

Text.prototype={ //参考Rect对象定义Text对象
    text:this.text,
    props:this.props,
    point:this.point,

    setText:function(text){
        this.text=text;
    },

    setProps:function(props){
        this.props=props;
    },

    setPoint:function(point){
        this.point=point;
    },

    getText:function(){
        return{
            text:this.text
        }
    },

    getProps:function(){
        return{
            props:this.props
        }
    },

    getPoint:function(){
        return{
            point:this.point
        }
    }
}