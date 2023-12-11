var movieCanvas,imageCanvas,hiddenCanvas;
var movieContext,imageContext,hiddenContext;

var canvasRect=new Rect();
var image=new Image();
var alpha=0;
var id=0;
function initMovieCanvas(){
   
    movieCanvas=getCanvas('movieCanvas');
    movieContext=getContext(movieCanvas);
    movieCanvas.width=600;
    movieCanvas.height=600;
    // movieCanvas.style.background=MOVIE_BACKGROUND_COLOR;
    // movieCanvas.style.borderRadius=`${BORDER_RADIUS}px`;

    canvasRect=new Rect(0,0,movieCanvas.width,movieCanvas.height); 

}

function initImageCanvas(){
    imageCanvas=getCanvas('imageCanvas');
    imageContext=getContext(imageCanvas);
    imageCanvas.width=movieCanvas.width;
    imageCanvas.height=movieCanvas.height;
    imageCanvas.style.background=IMAGE_BACKGROUND_COLOR;
    imageCanvas.style.borderRadius=`${BORDER_RADIUS}px`;
}
function initImage(){
    image.src='images/micky.jpeg';
    image.onload=onImageLoad;
}

function onImageLoad(){
    id=setInterval(onInterval,1000/24);
}
function onInterval(){
    if(alpha>1){ //动画出口
        clearInterval(id);
        return;
    }
    movieContext.globalAlpha=alpha;
    movieContext.drawImage(image, 0,0,80,55, 
        movieCanvas.width/2-80/2,movieCanvas.height/2-55/2,80,55 );
    alpha+=0.001;
}

function init(){
    initMovieCanvas();
    initImage();
}
init();