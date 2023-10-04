let blocksize = 25;
let totalrow = 17;
let totalcol = 17;
let board;
let context;

let snakeX = blocksize * 5;
let snakeY = blocksize * 5;

var speedX = 0;
let speedY = 0;

let snakebody  = [];

let foodX;
let foodY;

var gameover = false;

window.onload = function(){
    board = document.getElementById("board");
    board.height = totalrow * blocksize;
    board.width = totalcol * blocksize;
    context = board.getContext("2d");

    placefood();
    document.addEventListener("keyup", changedirection);
    setinterval(update,1000/10); // speed of snake
}
function update(){
    if (gameover){
        return;
    }
    //  Background of game
    context.fillStyle = "green";
    context.fillRect(0,0,board.width,board.height);

    // food color  and position
    context.fillStyle= "yellow";
    context.fillRect(foodX, foodY, blocksize, blocksize);
    if (snakeX == foodX && foodY == foodY){
        snakebody.push([foodX,foodY]);
        placefood();
    }
    //  body will grow
    for (let i=snakebody.lenth-1; i>0; i-- ){
        snakebody[i]=snakebody[i-1];
    }
    if (snakebody.length){
        snakebody[0]=[snakeX, snakeY];
    }
    context.fillstyle= "white";
    snakeX += speedX * blocksize;
    snakeY += speedY * blocksize;
    context.fillRect(snakeX,snakeY,blocksize,blocksize);
    for (let i = 0; i<snakebody.length;i++){
        context.fillRect(snakebody[i][0],snakebody[i][1],blocksize,blocksize);
    }
    if (snakeX < 0 
        || snakeX > totalcol * blocksize
        || snakeY < 0
        || snakeY > totalrow * blocksize) {
            gameover = true;
            alert ("Game Over");
        }
        for (let i=0; i<snakebody.length;i++){
            if(snakeX==snakebody.lenth[i][0]&& snakeY==snakebody[i][1]){
                gameover = true; // eats own body
                alert("Game Over");
            }
        }
}
function changedirection(e){
    if (e.code == "ArrowUp" && speedY != 1){
        speedX=0;
        speedY=1;
    }
    else if(e.code == "ArrowDown" && speedY != -1){
        speedX = 0;
        speedY = 1;
    }
    else if (e.code =="ArrowLeft" && speedX != 1){
        speedX = -1;
        speedY = 0;
    }
    else if (e.code =="ArrowRight" && speedX != -1){
        speedX = 0;
        speedY = 1;
    }
}
// randomly place food
function placefood(){
    foodX = Math.floor(Math.random()*totalcol)*blocksize;
    foodY = Math.floor(Math.random()*totalrow)*blocksize;
}