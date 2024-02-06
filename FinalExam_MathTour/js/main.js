//--------------------变量定义----------------------

var mainBackGround = new Image();
var buttonImage1 = new Image();
var buttonImage2 = new Image();
var buttonImage3 = new Image();

var buttonRects=[];


var c_rect1 = new Rect(40, 600, 100, 100);
var c_rect2 = new Rect(200, 600, 100, 100);
var c_rect3 = new Rect(300, 600, 100, 100);
var c_rect4 = new Rect(400, 600, 100, 100);
var sum = 0;
//--------------------函数定义块----------------------
// function addButton(){
//     let str = "";

//     str+="<button id=\"pytha\" type=\"button\">勾股定理</button>";
//     str+="<button id=\"circle\" type=\"button\">圆周率</button>";
//     str+="<button id=\"chikRab\" type=\"button\">鸡兔同笼</button>";

//     console.log(1);
//     return str;

// }

// function buttonClick(){
//     $("#pytha").on("click",function(e){
//         window.location.href="pytha.html";
//     });

//     $("#circle").on("click",function(e){
//         window.location.href="circle.html";
//     });

//     $("#chikRab").on("click",function(e){
//         window.location.href="chikRab.html";
//     });
// }

// function createButton(){
//     let strHtml=addButton();
//     addHtmlIntoDoc(objContainer,strHtml);
//     buttonClick();//事件注册
// }


/**
 * 绘制按钮图片
 *  
 */
function drawButtonImage(){

    var rect1 = new Rect(canvas.width/8,canvas.height*4/6,200,100);
    var rect2 = new Rect(canvas.width/8+350,canvas.height*4/6,200,100);
    var rect3 = new Rect(canvas.width/8+700,canvas.height*4/6,200,100);
    buttonImage1.src = GUIDE_SETTINGS.imgUrl.intro;
    buttonImage1.onload = function() {
        drawImg(context,buttonImage1,rect1);
    };

    buttonImage2.src = GUIDE_SETTINGS.imgUrl.video;
    buttonImage2.onload = function(){
        drawImg(context,buttonImage2,rect2);
    };
    
   buttonImage3.src = GUIDE_SETTINGS.imgUrl.game;
   buttonImage3.onload = function(){
        drawImg(context,buttonImage3,rect3);
   }
}

/**
 * 导语介绍绘制
 */
function drawGuidePageText(){
    var textguide = new Text();
    textguide.props.font="40px FangSong";
    textguide.text = GUIDE_SETTINGS.GUIDE_TEXT;
    textguide.point.x = canvas.width/11;
    textguide.point.y = canvas.height/7;
    drawWrapText(context,textguide,1000,40);
}

/**
 * 绘制背景
 */
function drawMainBackGround(){
    mainBackGround.src = GUIDE_SETTINGS.imgUrl.background;//背景图片的链接
    mainBackGround.onload = onbackGroundLoad;
}

/**
 * 背景加载后绘制按钮
 */
function onbackGroundLoad(){
    var rect1 = new Rect(0,0,canvas.width,canvas.height);
    drawImg(context,mainBackGround,rect1);
    drawButtonImage();//绘制按钮
    drawGuidePageText();//绘制图片和文字
}



//--------------------事件注册块----------------------

function onCanvasClick(e){
        
        var x = e.clientX - canvas.getBoundingClientRect().left;;
        var y = e.clientY - canvas.getBoundingClientRect().top;

        var rect1 = new Rect(canvas.width/8,canvas.height*4/6,200,100);
        var rect2 = new Rect(canvas.width/8+350,canvas.height*4/6,200,100);
        var rect3 = new Rect(canvas.width/8+700,canvas.height*4/6,200,100);
        if (isInsideRect(x, y, rect1)) {
            console.log(1);
            introduce();
        }else if(isInsideRect(x,y,rect2)) { 
            console.log(2);
            videoPlay();
     
        }
        else if(isInsideRect(x,y,rect3)){
            console.log(3);
            drawStartPage();
        }
}


  

function pageGuidance(){//引导跳转页面
    canvas.removeEventListener("click",onCcCanvasCick);
    canvas.removeEventListener("click",onClickGuide);
    drawMainBackGround();
    canvas.addEventListener("click",onCanvasClick);//点击事件注册
}


//---------------------初始化块----------------------

//  pageGuidance();
