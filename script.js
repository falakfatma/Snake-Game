let gameAlert = document.querySelector('.gameAlert')
let canvas = document.getElementById('board')
let ctx = canvas.getContext('2d')
let tileSize = 20;
let tileCount = 30;
let xDirection = tileSize;
let yDirection = 0;
// let headX = 10;
// let headY = 10;

let appleX = Math.floor(Math.random() * (canvas.width - tileSize))
let appleY = Math.floor(Math.random() * (canvas.height - 100))
let snake = [
  {
    x :  tileSize * 3,
    y : 10,
  },
  {
    x: tileSize * 3,
    y: 10
  },
  {
    x: tileSize * 2,
    y: 10
  },

  {
    x: tileSize,
    y: 10
  }
]


console.log(snake)
document.addEventListener('keydown', keyDown)
let player = {
}
let keys = {
  ArrowUp: 'ArrowUp',
  ArrowLeft: 'ArrowLeft',
  ArrowDown: 'ArrowDown',
  ArrowRight: 'ArrowRight'
}

function createFood() {

  // console.log(appleY)
  // console.log(appleX)
  ctx.fillStyle = 'red'
  ctx.fillRect(appleX, appleY, tileSize, tileSize)
  console.log(appleX, appleY)

}
createFood()

//   // console.log(snakeHead)
//   // console.log(snakeHead)

function moveSnake() {

  const snakeHead = {
    x: snake[0].x + xDirection,
    y: snake[0].y + yDirection

  }
  // let snake = 
  snake.unshift(snakeHead)
  if(snake[0].x == appleX && snake[0].y == appleY){
    console.log(`you eat apple`)
  }
  else{
    snake.pop()
  }
}
moveSnake()



function drawSnake() {
  ctx.fillStyle = 'yellow'
  snake.forEach(element => {
    ctx.fillRect(element.x, element.y, tileSize, tileSize)
    ctx.strokeRect(element.x, element.y, tileSize, tileSize)
  })
}



function gameOver() {

}
// Change Direction
function keyDown(event) {
  // function changeDirection() {

  

 function changeSnakePosition(){
       
 const snakeHead = {
    x: snake[0].x + xDirection,
    y: snake[0].y + yDirection

  }
  snake.unshift(snakeHead)

 }

  if (event.keyCode == 38) {
    if(yDirection == tileSize)
      return;
    yDirection= - tileSize; //move one tile up
    xDirection = 0;

  }
  //down
  if (event.keyCode == 40) {
    if(yDirection == -tileSize)
      return;
    yDirection= tileSize ;//move one tile down
    xDirection = 0;
  }

  //left
  if (event.keyCode == 37) {
    if(xDirection == tileSize)
      return;
    yDirection = 0;
    xDirection = -tileSize;//move one tile left
  }
  //right
  if (event.keyCode == 39) {
    if(xDirection == -tileSize)
      return;
    yDirection= 0 ;
    xDirection = tileSize;//move one tile right
  }

changeSnakePosition()
  // changeDirection()
}


function gamePlay() {
  if (player.start) {
    drawSnake()
    // moveSnake()
    // drawFood()
    // moveSnake()
    // foodPosition()
    window.webkitRequestAnimationFrame(gamePlay)
  }
}
gamePlay()
function gameStart() {
  gameAlert.addEventListener('click', () => {
    gameAlert.classList.add('hide')
  })
  player.start = true
  window.webkitRequestAnimationFrame(gamePlay)

}
gameStart()