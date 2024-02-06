
  /**
   * 图片加载并绘制
   * @param {*} context 
   * @param {*} image 
   * @param {*} PATH 
   * @param {*} rect 
   */
  function Imageload(context,image,PATH,rect){
    image.src=PATH;
    image.onload = function() {  
      drawImg(context,image,rect);
    };  
  }
  /**需要修改1
   * 交互页面，同时输出提示内容text  （有点小问题）
   * @param {*} func 
   * @param {*} text 
   */
  function nextScene(func,text){
    // drawText(context,text,"red",true);  //绘制不出来，只能拆成下面的函数
  
    context.font = text.props.font;
    context.fillStyle = text.props.style;
    context.fillText(text.text, canvas.width-270,canvas.height-40);  //位置需要细调
    // context.fillText(text.text, canvas.width-context.measureText(text).width-10,canvas.height-context.measureText(text).height-10);
    
    canvas.addEventListener("mousedown", function() {
      setTimeout(func, 1000);
    });
  }
  
  /**  需要修改2
   * 换行函数
   * @param {*} x 
   * @param {*} y 
   * @param {*} texts 
   * @param {*} maxWidth 
   */
  var textout=new Text();
  function drawLineText(x, y, texts, maxWidth) {    //bug1：这里绘制文字会叠在一起--》test3    //修改方式：//修改方式：把实际距离拉大了（递归或者return y说不定可以更严谨点）
    texts.forEach(function (texttmp, index) { 
      textout.setText(texttmp);
      textout.setPoint({
        x: x,
        y: y + lineHeight * 3 * index  //逻辑不对，无法判断上一条输出的是多少行
      });
      drawGuideText(context, textout, maxWidth, lineHeight);
    });
  }
//按行绘制每一行的内容，防止有错误的判断函数
  function ifDrawText(currentTextIndex){
    if (
      Array.isArray(textAll) &&
      textAll[currentTextIndex] !== undefined &&
      Array.isArray(textAll[currentTextIndex].text) &&
      textAll[currentTextIndex].text.length > 0
    ) {
      drawLineText(borderXJ, 50, textAll[currentTextIndex].text, MaxWidth);
    } else {
      console.error("Invalid text data for currentTextIndex:", currentTextIndex);
    }
  }

const images = [new Image(),new Image()];
  function drawExplain(pathc,pathr){
    //绘制鸡兔图片和下方方块
    images[0].src = pathc; // 鸡
    images[1].src = pathr; // 兔 
    images.forEach((image, index) => {  
        image.onload = function() { 
          context.save();
          context.translate((imgWidth+dxImg)*index, 0);             
          Explain(index); // 当图片加载完成后，绘制图片和相关元素            
          context.restore();  
       };  
    }); 
  }
  function Explain(index){
    drawImg(context,images[index],imageRect);
    
    // 绘制蓝色描边矩形框（用于显示多少只 
    context.lineWidth=5;   
    drawRect(context,ansRect,"blue",0);       //颜色可以改，还没定。待修改：把颜色拎出来 const rectColor
      
  // drawZHI(context,ansRX,ansRY);
    var textZhi = new Text("只", {font: "30px Arial" }, {   
      x: imgWidth / 2 + ansRectSide / 2 + dxTxt,   
      y: ansRect.y + ansRect.height / 2   
    });
  
    var point= new Point(ansRX+ansRectSide,ansRY+ansRectSide);
    textZhi.setPoint(point);
    drawText(context,textZhi,"black",1);
  }
  
  function drawHeadorLeg(ifleg,x,y){
    let headorleg = new Text("头：", {font: "45px Arial" });
    let pointTMP= new Point(x,y);
  
    if(ifleg){
      pointTMP.y += 2*lineHeight;
      headorleg.text="足：";
    }
    headorleg.setPoint(pointTMP);
    drawText(context,headorleg,"red",1);
  }
  