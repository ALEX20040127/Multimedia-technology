/*
确定能实现的函数在这个js文件里

Module  :介绍孙子算经和鸡兔同笼最终版本代码（去大量注释版，真实正在编写的代码的是finalExam）
    Description:介绍孙子算经和鸡兔同笼
            一、介绍孙子算经：
                1.介绍孙子算经的历史悠久性，引入鸡兔同笼
            二、介绍鸡兔同笼
                1.介绍鸡兔同笼的基本信息，给出孙子算经中原句                交互：数量:1 : ①键盘敲击ABC  跳转相关界面
                  1.5交互界面（现在采取的是直接在上一页面绘制矩形框）
                2.寻找规律：随机生成 鸡和兔的数量，得出腿和头的数量          交互：数量1  ：键盘敲击ABC  A重播BC为剩下两个
                3.方法介绍1：抬腿法                                       交互：数量1  ：键盘敲击ABC  B重播AC为剩下两个
                4.方法介绍2：二元一次方程组                                交互：数量1  ：键盘敲击ABC  C重播AB为剩下两个
                5.课后小测：对原题进行解答，并出现2~3道变式
            三、交互方式：正常是鼠标点击[SZSJ,SZSJ->JTTL(这个有点问题)]，键盘敲击[JTTL]
                           同一页每个函数间增加setTimeout或者鼠标单击进行，现在完全是有啥出现啥，特别是后面讲解的时候
	Build_Date:2023-12-30
	Version   :3.0
 */

//1. 公共变量声明块........................................................

/*======常量声明区======*/
const BACKGROUND_COLOR="pink";
const BORDER_RADIUS=20;
const CANVAS_WIDTH=1000;
const TEXT_COLOR = "black"; // 文本颜色
const TEXT_FONT = "16px Arial"; // 文本字体和大小

const backGround_IMG_PATH="static/images/J/background.png";
const BGGrass_IMG_PATH="static/images/J/backGround_grass.jpg";

const ToolTip_IMG_PATH="static/images/J/tooltip.png";
const BL_IMG_PATH="static/images/blackboard.png";
const Board_IMG_PATH="static/images/J/board.jpg";

const SzsjCover_IMG_PATH="static/images/J/Szsj_COVER.png";  //499*720
const Szsj_IMG_PATH="static/images/J/SZSJ_JTTL.jpg";
const Chik_IMG_PATH="static/images/J/Chi.png";
const Rab1_IMG_PATH="static/images/J/Rab.png";
const Rab2_IMG_PATH="static/images/J/Rab_legLift.png";

const MaxWidth = CANVAS_WIDTH/2;//自动换行的输出宽度标准
const lineHeight = 24; // 行高
const dxImg=10,//图片之间的间隔
      dxTxt=3;//文字之间的间隔

const borderXJ=100,//给卷轴边框留的的位置
      gap= 3;
/*======变量声明区======*/
var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');

var index=0;
var Rabflag=false;

var sceneCount=0;
//======image=======
var imageTempJ= new Image();
var background = new Image();
var tooltip = new Image();
var imageSzsjCover = new Image();
var imageSzsj = new Image();
var imageChik = new Image();
var imageRab1 = new Image();
var imageRab2 = new Image();

//======rect
var rect = new Rect(0,0,canvas.width,canvas.height);

var imgX=borderXJ+30,
    imgY=canvas.height/2,  //注意和title之间的高度关系
    imgWidth=90,
    imgHeight=120;
var imageRect = new Rect(imgX,imgY,imgWidth,imgHeight);

//鸡兔头脚
var ansRectSide=30,
    ansRX=imgX + imgWidth/2 - ansRectSide/2,
    ansRY=imgY+imgHeight+gap;
var ansRect=new Rect(ansRX,ansRY,ansRectSide,ansRectSide);//正方形答案框

var epY=30;
    explainRW=300,
    explainRH=canvas.height-epY*2,
    epX=canvas.width-borderXJ-explainRW;
var epRect=new Rect(epX,epY,explainRW,explainRH);
var tooltipRect = new Rect(canvas.width/4,canvas.height/4,canvas.width/2,canvas.height/2);


//=======text -->长串内容移动到了Text.js里面========
var textTemp= new Text();
var next= new Text("单击进入下一页", { font: "24px Arial" ,style:"red"}, {});
var textAll = [ 
  {  
    text: [text_SZSJ_Intro.text[0], text_SZSJ_Intro.text[1], text_SZSJ_Intro.text[2], text_SZSJ_Intro.text[3]],  
  },  
  {  
    text: [textSZSJ.text[0], textSZSJ.text[1], textSZSJ.text[2], textSZSJ.text[3]],  
  },  
  {  
    text: [textWYW.text],  
  },  
  {  
    text: [textfy.text],  
  },  
  {  
    text: [legLift.text[0], legLift.text[1], legLift.text[2]],  
  },
  {  
    text: [BinaryFirstOrderSystem_Introduce.text[0], BinaryFirstOrderSystem_Introduce.text[1]] 
  }, 
  {  
    text: [searchLaw.text[0], searchLaw.text[1]]  
  }, 
  {  
    text: [law.text[0], law.text[1]] 
  } 
];
//2. 函数定义块..........完全没问题的函数都被移到了functionJ里
//初始化界面，清空并绘制图片 （问题：直接用这个函数背景图片会盖住别的图片/较晚绘制）
function initCanvas(){ //背景图片会盖住别的图片
  clearCanvas(context,rect);
  Imageload(context,background,backGround_IMG_PATH,rect); 
}

/**
 * 交互页面，同时输出提示内容text  （有点小问题）
 * @param {*} func 下一页对应的函数
 * @param {*} text 提示内容
 */
function nextScene(func,text){
//绘制提示文字
  // drawText(context,next,"red",1);  //绘制不出来，只能拆成下面的函数
  context.font = text.props.font;
  context.fillStyle = text.props.style;
  context.fillText(text.text, canvas.width-270,canvas.height-40);  //位置需要细调
//鼠标响应事件  
  canvas.addEventListener("mousedown", onClickFunc(func));
}

function onClickFunc(func){
    setTimeout(func, 1000);
}

var textout=new Text();
function drawLineText(x, y, texts, maxWidth) {    //bug1：这里绘制文字会叠在一起--》test3    //修改方式：把实际距离拉大了（递归或者return y说不定可以更严谨点）
  texts.forEach(function (texttmp, index) { 
    textout.setText(texttmp);
    textout.setPoint({
      x: x+100,
      y: y + lineHeight * 3 * index+20  //逻辑bug：无法判断上一条输出的是多少行--》拉大行间距
    });
    drawWrapText(context, textout, maxWidth, lineHeight);
  });
}

function drawExplainClass(){  
  //绘制标题     需要修改  字体，字号等    
  // context.font="20px Arial"
  var searchlAWTitle = new Text("试试寻找鸡兔同笼题目中鸡、兔、头、足四者的规律吧",
                                  {font:"60px"},        //怎么不起变化？？？
                                  {x:borderXJ,y:40});
  drawWrapText(context, searchlAWTitle, "canvas.width/2", lineHeight);

  //绘制图片右侧的头/足
  let holX=imgX+2*imgWidth+dxImg+30,
      holY=imgY+imgHeight/2-lineHeight+10;
  drawHeadorLeg(1,holX,holY);
  drawHeadorLeg(0,holX,holY);
  
  //绘制讲解框
  context.lineWidth=3;
  drawRect(context,epRect,"green",0);
  drawRect(context,epRect,"white",1);

  //绘制讲解文字
  //提示
  var hint = new Text("敲击空格随机生成鸡和兔的数量", {font: "36px" },{
    // x:imgX+imgWidth/2,
    x:500,
    y:400
  });
  drawText(context,hint,"green",1);
}

/*--------------------场景-----------------*/
function SZSJ_Intro(){
  initCanvas();  //背景加载慢，会盖住
  background.onload = function() { 
      drawImg(context,background,rect);
      //引入：                                        bug：这里绘制文字时会叠在一起--》test3
      ifDrawText(0);
    //绘制孙子算经                                  //原图太大了width有530
      var szsjRect1=new Rect(canvas.width-borderXJ-220,30,199.6,288);                     //位置需要细调
      Imageload(context,imageSzsjCover,SzsjCover_IMG_PATH,szsjRect1);
      //交互
      nextScene(SZSJ_introduce,next);
  }; 
}

function SZSJ_introduce(){
  // sceneCount=1;
  clearCanvas(context,rect);
  // background.onload = function() {  //好像不用再加载了
      drawImg(context,background,rect);
    //介绍孙子算经                                       bug：这里绘制文字会叠在一起--》test3
      ifDrawText(1);
    //绘制孙子算经                                  //原图太大了width有530
      var szsjRect1=new Rect(canvas.width/2+150,50,230,250);      //需要细调
      Imageload(context,imageSzsj,Szsj_IMG_PATH,szsjRect1);
  // }

  //交互
   nextScene(JTTL_All,next);
}

function JTTL_All(){
  // sceneCount=2;
  // initCanvas();//初始化，清空，绘制背景（直接用会有点问题）
  clearCanvas(context,rect);
  drawImg(context,background,rect);
//绘制原题文字
  ifDrawText(2);
//绘制图片
  var szsjRect=new Rect(canvas.width,10,imageSzsj.width,imageSzsj.height);
  drawImg(context,imageSzsj,szsjRect);
//绘制翻译文字
 //因为写的函数没有x,y参数所以直接平移坐标轴
  context.save();
  context.translate(0, 100);
  ifDrawText(3);
  context.restore();

//交互  测试用的鼠标点击，实际用的键盘事件，一定要记得改
// /*
  // canvas.addEventListener("mousedown", onClicksearchLaw);
  canvas.addEventListener("click",onClickGuide);
}
// */
//交互2：进入课堂小测
function onClicksearchLaw(){
     //目前bug：它不能往下走了，其次这里要改成键盘事件
    setTimeout(JTTL_searchLaw, 1000);
}

/*未完成代码：

1.在制定位置绘制文字的函数,drawExplainText  --》test6，
          应用  JTTL_searchLaw()       --》在方框内绘制数字
                JTTL_solve_LegLift()     --》在方框内绘制数字，同时兼具绘制抬腿后的图片和腿的数量
              JTTL_solve_Bi()       --》在方框内写字母，x,y,m,n


2.课后小测，类似于后面的题目但简单很多，页面布局也简单点
  function AfterQuiz(){

  }


3.每一页的大标题，同时平移坐标系让文字不会重叠
var titleRect= new Rect;
drawTitle(title)

              */
//寻找规律
function JTTL_searchLaw(){
  //初始化
  clearCanvas(context,rect);
  // drawImg(context,background,rect);    //为什么还有上一张画的孙子算经啊啊啊？？？？？
  
//画鸡和兔的背景草地（好像有点丑）
    var bgGrass=new Image();
    bgGrass.src="static/images/J/backGround_grass.jpg";
    var Grect = new Rect(0,canvas.height/2,canvas.width/2,canvas.height);
    bgGrass.onload = function() {  
         drawImg(context,bgGrass,Grect);
        
        //绘制图示
        drawExplain(Chik_IMG_PATH,Rab1_IMG_PATH);

        //绘制标题、讲解框等
        drawExplainClass();

        //键盘监听,空格键
        window.onkeydown=onCanvasKeydown;

  }; 
}

//解题思路： 
  //1.抬腿法
function JTTL_solve_LegLift(){
  //初始化
    clearCanvas(context,rect);
    //drawImg(context,background,rect);    //为什么还有上一张画的孙子算经啊啊啊？？？？？
  
//画鸡和兔的背景草地（好像有点丑）
    var bgGrass=new Image();
    bgGrass.src="static/images/J/backGround_grass.jpg";
    var Grect = new Rect(0,canvas.height/2,canvas.width/2,canvas.height);
    bgGrass.onload = function() {  
         drawImg(context,bgGrass,Grect);
        
        //绘制图示
        drawExplain(Chik_IMG_PATH,Rab1_IMG_PATH);

        //绘制标题、讲解框等
        drawExplainClass();

        //键盘监听,空格键
        // window.onkeydown=onCanvasKeydown;

  }; 
}

//2.二元一次方程式
function JTTL_solve_Bi(){
    //初始化
      clearCanvas(context,rect);
      //drawImg(context,background,rect);    //为什么还有上一张画的孙子算经啊啊啊？？？？？
    
  //画鸡和兔的背景草地（好像有点丑）
      var bgGrass=new Image();
      bgGrass.src="static/images/J/backGround_grass.jpg";
      var Grect = new Rect(0,canvas.height/2,canvas.width/2,canvas.height);
      bgGrass.onload = function() {  
           drawImg(context,bgGrass,Grect);
          
          //绘制图示
          drawExplain(Chik_IMG_PATH,Rab1_IMG_PATH);
  
          //绘制标题、讲解框等
          drawExplainClass();
  
          //键盘监听,空格键
          // window.onkeydown=onCanvasKeydown;
          canvas.addEventListener("click",onClickGuide);
  
    }; 
  }

  function onClickGuide(){
      context.clearRect(0, 0, canvas.width, canvas.height);
      canvas.removeEventListener("mousedown",onClickFunc);
      canvas.removeEventListener("mousedown",onClicksearchLaw);
      pageGuidance();
  }


//3. 事件注册块...........................................................
  //添加键盘响应相关代码
  // var functionsArray = [JTTL_All,JTTL_searchLaw, JTTL_solve_LegLift, JTTL_solve_Bi];
  //根据网络搜索：不同的系统和浏览器，键码keyCode可能会有所不同
  function onCanvasKeydown(e){ //注册keydown事件
    // if(e.key=='a'){
    //   JTTL_searchLaw();
    // }
    // if(e.key=='b'){
    //   JTTL_solve_LegLift();
    // }
    // if(e.key=='c'){
    //   JTTL_solve_Bi();
    // }
    // if(e.key=='Backspace'){
    //   //if(e.keyCode==8)
    //   JTTL_All();
    // }
    // if (e.key === ' ') { // 检查是否按下空格键
    //   //if(e.keyCode==32)
    //   onKeydown();
    // }
    // // if (e.key === 'Enter') { // 检查是否按下回车键
    // //   //if(e.keyCode==13)
    // //   onKeydown();
    // // }
    if (e.key === ' ') { // 检查是否按下空格键
     context.ClearRect(0,0,canvas.width,canvas.height);
     pageGuidance();
    }

  }
  
  //鼠标单击事件   可以开一个函数数组sceneArray，记录当前的sceneCount参数，然后往后走一个还可以判断区域，如果是左边就回退cnt--，是右边就往下走cnt++
  
//4. 初始化块............................................................
function introduce(){
  SZSJ_Intro();//实际的开头  ，其实是不是可以把这个函数直接复制进来
  // JTTL_searchLaw()  //正在测试的代码，如果没删掉，记得删
}
// introduce();  //程序入口


