const RECT_HEIGHT=50;
const RECT_WIDTH=400;
const STEP=3;
const RECT_COLOR='green';
const FPS=1000/58;
const FONT_SIZE=60;
const INTERVAL=300;

const MICKY_IMG_PATH="images/micky.jpeg";
const MOVIE_BACKGROUND_COLOR="black";
const IMAGE_BACKGROUND_COLOR="#ffc";
const BORDER_RADIUS=20;

//变量声明区
// Canvas对象
var movieCanvas,imageCanvas,hiddenCanvas;
var movieContext,imageContext,hiddenContext;
var fillRect=new Rect();
var curWidth;
var process=0;

function initMovieCanvas(){
    movieCanvas=getCanvas('movieCanvas');
    movieContext=getContext(movieCanvas);
    movieCanvas.style.background=MOVIE_BACKGROUND_COLOR;
    movieCanvas.style.borderRadius=`${BORDER_RADIUS}px`;
}


function initRect(canvas){
    curWidth=0;
    fillRect.setRectSize(curWidth,RECT_HEIGHT);
    fillRect.setRectCord((canvas.width-RECT_WIDTH)/2,canvas.height/2-fillRect.h/2);
 
}

function nextMovieVideoFrame() {
    var rect = new Rect(0,0,movieCanvas.width,movieCanvas.height);
    clearCanvas(movieContext,rect);
    var rect1 = new Rect(100,movieCanvas.height/3,process,40);
    drawRect(movieContext,rect1,'green',true);
    process+=STEP;

    var text = new Text();
    var percent = Math.floor(process*100/402);
    text.text = percent +"%";
    text.point.x = movieCanvas.width*3/4;
    text.point.y = movieCanvas.height/4;
    text.props.font =`${FONT_SIZE}px Arial`;
    drawText(movieContext,text,'green',true);

   localStorage.setItem('currentWidth',process);

    if(process <= 400){
        requestAnimationFrame(nextMovieVideoFrame);
    }
    
 }

 function movieCanvasClick(){
    var process1 = localStorage.getItem('currentWidth');
    process = Number(process1);
    nextMovieVideoFrame();
 }
 
function init(){
    initMovieCanvas();
    initRect(movieCanvas);
    movieCanvas.onclick = movieCanvasClick;
}

init();