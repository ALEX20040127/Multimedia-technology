// var canvas = document.getElementById("canvas");
// var context = canvas.getContext('2d');
var background = new Image();

var choiceRects=[];
var currentQuestionIndex = 0;

var questions = [
    {
      question: CHOICE_SETTINGS.choice1.Question,
      choices: [CHOICE_SETTINGS.choice1.text[0],CHOICE_SETTINGS.choice1.text[1],
                CHOICE_SETTINGS.choice1.text[2], CHOICE_SETTINGS.choice1.text[3]],
      correctChoice: 0
    },
    {
      question: CHOICE_SETTINGS.choice2.Question,
      choices: [CHOICE_SETTINGS.choice2.text[0],CHOICE_SETTINGS.choice2.text[1],
                CHOICE_SETTINGS.choice2.text[2], CHOICE_SETTINGS.choice2.text[3]],
      correctChoice: 2
    },
    {
      question: CHOICE_SETTINGS.choice3.Question,
      choices: [CHOICE_SETTINGS.choice3.text[0],CHOICE_SETTINGS.choice3.text[1],
                CHOICE_SETTINGS.choice3.text[2], CHOICE_SETTINGS.choice3.text[3]],
      correctChoice: 1
    },
    {
      question: CHOICE_SETTINGS.choice4.Question,
      choices: [CHOICE_SETTINGS.choice4.text[0],CHOICE_SETTINGS.choice4.text[1],
                CHOICE_SETTINGS.choice4.text[2], CHOICE_SETTINGS.choice4.text[3]],
      correctChoice: 0
    }
  ];


//---------------------------------------函数部分------------------------------
/**
 * 绘制选项图片
 * @param {*} x 
 * @param {*} y 
 * @param {*} width 
 * @param {*} height 
 * @param {*} text 
 */
function drawChoiceRect(x, y, width, height,text) {
    var image = new Image();
    image.src = GAME_SETTING.imgUrl.choice;
    image.onload = function(){
      context.drawImage(image, x, y, width, height);
      var text1 = new Text();
      text1.text = text;
      text1.props.font = "20px FangSong";
      text1.point.x = x +20;
      text1.point.y = y +40;
  
      drawWrapText(context,text1,130,24);
      console.log(1);
    }
}


/** 
 * 绘制问题方框
 * @param {*} x 横坐标
 * @param {*} y 纵坐标
 * @param {*} width 宽
 * @param {*} height 高
 * @param {*} color 颜色
*/
function drawRect(x, y, width, height,color){
  context.beginPath();

  context.rect(x, y, width, height);
  context.fillStyle = color;
  context.fill();

}

/**
 * 绘制文字
 * @param {*} x 
 * @param {*} y 
 * @param {*} text 
 * @param {*} color 
 * @param {*} centered 
 */
function drawText(x, y, text, color, centered) {
    context.fillStyle = color;
    context.font = '20px FangSong';
    context.textBaseline = 'middle';
    // context.textAlign = centered ? 'center' : 'left';
    context.fillText(text, x, y);
}

/**
 * 绘制选项
 * @param {*} x 
 * @param {*} y 
 * @param {*} width 
 * @param {*} height 
 * @param {*} text 
 */
function drawChoice(x, y, width, height, text) {
    drawChoiceRect(x, y, width, height,text);

}

/**
 * 多个选项绘制
 * @param {*} choices 
 */
function drawChoices(choices) {
    var x = 200;
    var y = canvas.height*5/8;
    var width = 150;
    var height = 100;

    choices.forEach(function (choice, index) {    
        var choiceRect = {
            x: x+index*300,
            y: y,
            w: width,
            h: height
          };
          choiceRects[index] = choiceRect;
        drawChoice(x + index * 240, y, width, height, choice);
    });
    
}

/**
 * 绘制问题
 * @param {*} x 
 * @param {*} y 
 * @param {*} width 
 * @param {*} height 
 * @param {*} text 
 */
function drawQuestion(x, y, width, height,color, text) {
    drawRect(x, y, width, height,color);
    var text1 = new Text();
    text1.text = text;
    text1.point.x = x+20;
    text1.point.y = y+40;
    text1.props.font = '30px FangSong';
    drawWrapText(context,text1,900,30);
}

/**
 * 组装问题和选项
 * @param {*} question 
 * @param {*} choices 
 */
    function drawQuestionAndChoices(question, choices) {
    var questionX = 140;
    var questionY = 80;
    var questionWidth = 950;
    var questionHeight = 200;
    var color = GAME_SETTING.color;

    drawQuestion(questionX, questionY, questionWidth, questionHeight, color, question);
    drawChoices(choices);
}

/**
 * 绘制背景
 */
function drawBackGround(){
    background.src = CHOICE_SETTINGS.imgUrl;//背景图片的链接
    background.onload = onChoiceBackGroundLoad;
    console.log(1);
}

/**
 * 背景图像加载
 */
function onChoiceBackGroundLoad(){
    var rect1 = new Rect(0,0,canvas.width,canvas.height);
    drawImg(context,background,rect1);
    drawQuestionAndChoices(questions[currentQuestionIndex].question, questions[currentQuestionIndex].choices);
    addChoiceClickListeners();
}

/**
 * 下一个问题&当选择题进行完毕之后
 */
function nextQuestion() {
    currentQuestionIndex++;
    console.log(currentQuestionIndex);
    console.log(questions.length);
    if (currentQuestionIndex < questions.length) {
    var currentQuestion = questions[currentQuestionIndex];
    var rect1 = new Rect(0,0,canvas.width,canvas.height);
    drawImg(context,background,rect1);
    drawQuestionAndChoices(currentQuestion.question, currentQuestion.choices);
    } else {
      //选择题进行完毕之后
    //**************************************************
    // end函数，最后一页，需要连接
    console.log("现在准备结束");
    // context.clearRect(0,0,canvas.width,canvas.height);
    ccArrowFlag=0;
    ccPageOneOff = 0;
    ccDrawEndPage();
    //******************************************
    }
}

/**
 * 分数框
 */

function drawScore(){

}
//-----------------------------事件注册-------------------------------------------
/**
 * 点击事件
 * @param {*} e 
 */
function handleChoiceClick(e) {
    var clickX = e.clientX; // 获取鼠标点击的横坐标
    var clickY = e.clientY; // 获取鼠标点击的纵坐标

    choiceRects.forEach(function (choiceRect, index) {
      // 判断鼠标点击是否在选项元素的方框内
      if (isInsideRect(clickX, clickY, choiceRect)) {

        var currentQuestion = questions[currentQuestionIndex];
        if (index === currentQuestion.correctChoice) {
          // 点击了正确区域的反应
          console.log('点击了正确的选项');
          var rect = new Rect(0, 0, canvas.width, canvas.height);
          clearCanvas(context, rect);
          nextQuestion();
        } else {
          // 点击了错误区域的反应
          alert('点击了错误的选项');
        }
      }
    });
  }
    
/**
 * 给每个问题界面注册事件
 */
function addChoiceClickListeners() {
  var choices = document.querySelectorAll('canvas');
  choices.forEach(function (choice) {
    choice.addEventListener('click', handleChoiceClick);
  });
}

//--------------------选择题启动---------------------------------------------
function choiceQuiz(){
  drawBackGround();
}
