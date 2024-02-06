function Text(text,props,point){
    let defaultProps={
        align:"center",
        baseline:"middle",
        font:"20px Arial",
        style:"black"
    };
    let defaultPoint={
        x:0,
        y:0
    };
    this.text=text||"";
    this.props=props|| defaultProps;
    this.point=point||defaultPoint;
    
}

Text.prototype={
    text:"",
    props:undefined,
    point:undefined,

    setText:function(text){
        this.text=text;
    },

    setProps:function(props){
       this.props=props;
    },

    setPoint:function(point){
        this.point=point;
     },
   
    getTextInfo:function(){
        return{
            text:this.text,
            props:this.props,
            point:this.point
        }
    }
}