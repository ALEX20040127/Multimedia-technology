var cx = (canvas.width - 64) / 2;
var cy = (canvas.height - 64) / 2;
var th = 0;
var mCount = 5;
var chickenCaught = 0;
var rabbitCaught = 0;
var chickens = [];
var rabbits = [];
var targetChicken = 10;
var targetRabbit = 8;
var isGamePaused = false;
var isGameOver = false;
// 跨浏览器支持
var w = window;
var requestAnimationFrame =
  w.requestAnimationFrame ||
  w.webkitRequestAnimationFrame ||
  w.msRequestAnimationFrame ||
  w.mozRequestAnimationFrame;

// 包含图片
var bgReady = false;
var heroReady = false;
var chickenReady = false;
var rabbitReady = false;

var bgImage = new Image();
var heroImage = new Image();
var chickenImage = new Image();
var rabbitImage = new Image();

bgImage.onload = function () {
  bgReady = true;
};
heroImage.onload = function () {
  heroReady = true;
};
chickenImage.onload = function () {
  chickenReady = true;
};
rabbitImage.onload = function () {
  rabbitReady = true;
};

bgImage.src = GAME_SETTING.imgUrl.bg;
heroImage.src = GAME_SETTING.imgUrl.hero;
chickenImage.src = GAME_SETTING.imgUrl.chiken;
rabbitImage.src = GAME_SETTING.imgUrl.rabbit;

// 游戏对象
function Hero(speed, x, y) {
  this.speed = speed || 256;
  this.x = x || 0;
  this.y = y || 0;
}

function Chicken(speed, x, y) {
  this.speed = speed || 100;
  this.x = x || 0;
  this.y = y || 0;
}

function Rabbit(speed, x, y) {
  this.speed = speed || 100;
  this.x = x || 0;
  this.y = y || 0;
}

for (var m = 0; m < mCount; m++) {
  chickens.push(
    new Chicken(
      Math.random() * 50 + 50,
      -Math.random() * canvas.width,
      Math.random() * (canvas.height - 96)
    )
  );

  rabbits.push(
    new Rabbit(
      Math.random() * 50 + 50,
      -Math.random() * canvas.width,
      Math.random() * (canvas.height - 96)
    )
  );
}

var hero = new Hero(256, cx, cy);


function checkControls(modifier) {
  // console.log(hero.x + ", " + hero.y);
  if (38 in keysDown && hero.y > 32) {
    hero.y -= hero.speed * modifier;
  }
  if (40 in keysDown && hero.y < canvas.height - 64) {
    hero.y += hero.speed * modifier;
  }
  if (37 in keysDown && hero.x > 32) {
    hero.x -= hero.speed * modifier;
  }
  if (39 in keysDown && hero.x < canvas.width - 64) {
    hero.x += hero.speed * modifier;
  }
}

// 重置游戏当玩家捕获到鸡，兔时
function reset(monster) {
  monster.x = -32;
  monster.y = 32 + Math.random() * (canvas.height - 96);
  monster.speed = Math.random() * 50 + 50;
}

function update(modifier) {
  checkControls(modifier);

  // 检查是否超过目标数量，如果超过则在画布正中间绘制一张图片，并重新启动 startGame 函数
  if (chickenCaught > targetChicken || rabbitCaught > targetRabbit) {
    isGamePaused = true;
    // setTimeout(requestAnimationFrame(main),2000);
    context.fillStyle = "rgba(0, 0, 0, 0.5)";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "rgb(255, 255, 255)";
    context.font = "36px Arial";
    context.textAlign = "center";
    context.fillText("游戏已暂停", canvas.width / 2, canvas.height / 2);
  }

  // 检查是否达到目标数量，如果达到则游戏结束并启动 choice 函数
  if (chickenCaught === targetChicken && rabbitCaught === targetRabbit) {
    isGameOver = true;
    var rect = new Rect(0,0,canvas.width,canvas.height);
    clearCanvas(context,rect);
    choiceQuiz();
  }
  
  for (var m = 0; m < mCount; m++) {
    chickens[m].x += chickens[m].speed * modifier;
    if (chickens[m].x > canvas.width) {
      reset(chickens[m]);
    }
    if (impact(chickens[m])) {
      chickenCaught++;
      reset(chickens[m]);
    }

    rabbits[m].x += rabbits[m].speed * modifier;
    if (rabbits[m].x > canvas.width) {
      reset(rabbits[m]);
    }
    if (impact(rabbits[m])) {
      rabbitCaught++;
      reset(rabbits[m]);
    }
  }
}

function impact(m) {
  var x = m.x;
  var y = m.y;
  var hx = hero.x;
  var hy = hero.y;
  return (
    y + 40 > hy && 
    y < hy + 40 && 
    x + 40 > hx && 
    x < hx + 40
  );
}

// 绘制一切
function render() {
  // 绘制 "游戏已暂停" 的文字

  if (bgReady) {
    context.drawImage(bgImage, 0, 5,bgImage.width,bgImage.height-20);

  }
  if (heroReady) {
    context.drawImage(heroImage, hero.x, hero.y);
  }
  if (chickenReady) {
    for (var m = 0; m < mCount; m++) {
      context.drawImage(
        chickenImage,
        0,
        0,
        40,
        40,
        chickens[m].x,
        chickens[m].y,
        40,
        40
      );
    }
  }

  if (rabbitReady) {
    for (var m = 0; m < mCount; m++) {
        context.drawImage(
            rabbitImage,
            0,
            0,
            40,
            45,
            rabbits[m].x,
            rabbits[m].y,
            40,
            45
        );
    }
  }
  // 分数
  context.fillStyle = "rgb(250, 250, 250)";
  context.font = "24px Helvetica";
  context.textAlign = "left";
  context.textBaseLine = "top";
  context.fillText("抓到鸡的数量：" + chickenCaught,32, 44);
  context.fillText("抓到兔的数量：" + rabbitCaught, 32, 76);
}

/**
 * 游戏说明，按下游戏开始按钮开启游戏
 */
function drawStartPage(){
  // 清除画布
  context.clearRect(0, 0, canvas.width, canvas.height);
  canvas.removeEventListener("click",onCanvasClick);
  // 绘制文字说明
  var text = new Text(GAME_SETTING.text);
  text.text = GAME_SETTING.startText;
  text.props.font ="40px FangSong";
  text.point.x = canvas.width/11;
  text.point.y = 40;
  drawWrapText(context,text,1000,45);

  // 绘制按钮图片
  var buttonImage = new Image();
  buttonImage.src = GAME_SETTING.imgUrl.startButton; 
  buttonImage.onload = function() {
    context.drawImage(buttonImage, canvas.width / 2 - buttonImage.width / 2, canvas.height / 2 + 50);
    canvas.addEventListener("click", startGame);
  };

  // 监听鼠标点击事件
   
}


// 处理键盘控制
var keysDown = {
  "32":false
};

window.addEventListener(
  "keydown",
  function (e) {
    keysDown[e.keyCode] = true;
  },
  false
);

window.addEventListener(
  "keyup",
  function (e) {
    delete keysDown[e.keyCode];
  },
  false
);

function main() {
  createCanvas();
  var n = Date.now();
  var d = n - th;
  update(d / 1000);
  render();
  th = n;

  // 请求再次执行
  if(!isGamePaused && !isGameOver){
    requestAnimationFrame(main);
  }
  if (isGamePaused) {
    
    var image = new Image();
    image.src = GAME_SETTING.imgUrl.losePop;
    image.onload = function(){
      context.drawImage(image, canvas.width/2-image.width/2, canvas.height/2-image.height/2,
       image.width, image.height);
      
    }
    window.addEventListener("keydown",onkeydown);
  }
}

function onkeydown(e){
  if(e.keyCode == 32){
    isGamePaused = false; // 恢复游戏状态
    chickenCaught = 0; // 重置鸡的数量
    rabbitCaught = 0; // 重置兔的数量
    startGame(); // 重新开始游戏
  }
}

//---------------------------初始化------------------------------------------
// 开始游戏
function startGame(){
  var rect = new Rect(0,0,canvas.width,canvas.height);
  clearCanvas(context,rect);

  th = Date.now();
  // console.log("\t " + th);
  reset(chickens[0]);
  reset(rabbits[0]);
  main();
}

// startGame();

