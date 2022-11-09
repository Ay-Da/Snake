var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext("2d");
var w = canvas.width;
var h = canvas.height;
var cellSize = 20;
var food;
var snake;
var direction;
var score;
ctx.strokeStyle = 'green';
ctx.strokeRect(0, 0, w, h);
var timeInt = 500;
var scoreCount = document.getElementById("score");



function init() {

    createSnake();
    createFood();

    score = 0;
    scoreCount.textContent = 0;
    window.onkeydown = keyEvent;
    direction = "right";
    if (typeof gameLoop != "undefined")
        clearInterval(gameLoop);
    gameLoop = setInterval(paintCanvas, timeInt);



}
init();
function createSnake() {
    var length = 5;
    snake = [];
    for (var i = length - 1; i >= 0; i--) {
        snake.push({ x: i, y: 0 })

    }

}
function createFood() {
    food = {
        x: Math.round(Math.random() * (w - cellSize) / cellSize),
        y: Math.round(Math.random() * (h - cellSize) / cellSize)
    }
}
function paintCanvas() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#eee';
    //ctx.strokeRect(0, 0, w, h);
    for(var x=0.5; x<canvas.width; x+=cellSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
    }
    for (var y = 0.5; y < canvas.height; y += cellSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
    }
    ctx.stroke();
    var hx = snake[0].x;
    var hy = snake[0].y;
    switch (direction) {
        case "right":
            hx++;
            break;
        case "left":
            hx--;
            break;
        case "up":
            hy--;
            break;
        case "down":
            hy++;
            break;
    }
    
    if (hx == -1 || hx == w / cellSize || hy == -1 || hy == h / cellSize || isCollision(hx, hy, snake)) {
        init();
        return;
    }
    if (hx == food.x && hy == food.y) {
        score++;
        scoreCount.textContent = score;
        createFood();


    } else {
        snake.pop();
    }

    var newHead = { x: hx, y: hy };
    snake.unshift(newHead);

    for (var i = 0; i < snake.length; i++) {
        paintCell(snake[i].x, snake[i].y);

    }
    paintCell(food.x, food.y)
}
function paintCell(x, y) {
    ctx.fillStyle = "blue";
    ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    ctx.strokeStyle = "white";
    ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
}
function isCollision(x, y, array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].x == x && array[i].y == y) {
            return true;
        }
    }
    return false;

}

function keyEvent(e) {
    var key = e.which;
    if (key == "37" && direction != "right")
        direction = "left";
    else if (key == "38" && direction != "down")
        direction = "up";
    else if (key == "39" && direction != "left")
        direction = "right";
    else if (key == "40" && direction != "up")
        direction = "down";
}