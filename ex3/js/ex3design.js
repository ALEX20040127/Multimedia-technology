var rem = canvas.width/200;
var date = new Date();

function drawDot(){
    for (var i = 0; i < 60; i++) {
        var rad = 2 * Math.PI / 60 * i;
        var x = canvas.width/2+Math.cos(rad) * (RADIUS - 18*rem);
        var y = canvas.height/2+Math.sin(rad) * (RADIUS - 18*rem);
        context.beginPath();
        if (i % 5 === 0) {
            context.arc(x, y, 2*rem, 0, 2 * Math.PI, false);
            context.fillStyle = "PaleVioletRed";
        } else {
            context.arc(x, y, 2*rem, 0, 2 * Math.PI, false);
            context.fillStyle = "Pink";
        }
        context.fill();
    }
}

function drawDate(){
    var week = date.getDay();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    switch (week){
        case 1: week = "星期一";
        break;
        case 2: week = "星期二";
        break;
        case 3: week = "星期三";
        break;
        case 4: week = "星期四";
        break;
        case 5: week = "星期五";
        break;
        case 6: week = "星期六";
        break;
        default: week = "星期天";
        break;
    }
    context.save();
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "DeepPink";
    context.font = "16px"
    context.fillText(week,canvas.width/2,canvas.height/4);
    context.fillStyle = "HotPink";
    context.fillText(month+" 月",canvas.width/4,canvas.height/2);
    context.fillText(day+" 号",canvas.width*3/4,canvas.height/2);
    context.stroke();
    context.restore();
}