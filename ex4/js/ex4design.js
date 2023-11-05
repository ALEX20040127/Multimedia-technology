var rem = canvas.width/200;
var date = new Date();
const apiKey = "5feec3fea154195b81e6ef4793c40af1";
const city = "hangzhou";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=${city}&appid=${apiKey}`;

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

function playTickSound() {
    const audio = document.getElementById("clockTick");
    audio.currentTime = 0; // 从音频开始位置播放
    audio.play();
}

function drawCurrentWeather(){
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const city = data.name;
        const temperature = data.main.temp;//气温
        const weather = data.weather[0].main;//天气
        const weatherDescription = data.weather[0].description;//详细天气
        const humidity = data.main.humidity;//湿度

        wcontext.fillStyle="#4682B4";
        wcontext.font='20px sans-serif';
        wcontext.fillText("城市:"+city,weatherInfo.width/6,weatherInfo.height*2/8);
        wcontext.fillText("温度:"+temperature+"°C",weatherInfo.width/6,weatherInfo.height*3/8);
        wcontext.fillText("天气:"+weather,weatherInfo.width/6,weatherInfo.height/2);
        wcontext.fillText("详细天气:"+weatherDescription,weatherInfo.width/6,weatherInfo.height*5/8);
        wcontext.fillText("湿度:"+humidity,weatherInfo.width/6,weatherInfo.height*6/8);
    })
    .catch(error => {
        console.error("Error fetching weather data: " + error);
    });

};

// const snowflakes = [];
// function createSnowflake() {
//     if (snowflakes.length < 50) {
//         const x = Math.random() * canvas.width;
//         const y = Math.random() * canvas.height;
//         const size = Math.random() * 5 + 2; // 雪花大小范围
//         const speed = Math.random() * 3 + 1; // 雪花下落速度范围
//         const color = "white";
        
//         snowflakes.push({ x, y, size, speed, color });
//     }
// }

// function drawSnowflakes() {
//     for (let i = 0; i < snowflakes.length; i++) {
//         const flake = snowflakes[i];
        
//         context.beginPath();
//         context.fillStyle = flake.color;
//         context.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
//         context.fill();
        
//         flake.y += flake.speed;
        
//         if (flake.y > canvas.height) {
//             flake.y = 0;
//             flake.x = Math.random() * canvas.width;
//         }
//     }
// }

// function animate() {
//     context.clearRect(0, 0, canvas.width, canvas.height);
//     createSnowflake();
//     drawSnowflakes();
//     requestAnimationFrame(animate);
// }

