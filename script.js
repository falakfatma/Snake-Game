let gameAlert = document.querySelector('.gameAlert')
let canvas = document.getElementById('board')
let ctx = canvas.getContext('2d')
let tileSize = 20;
let tileCount = 30;
let xDirection = tileSize;
let yDirection = 0;
let player = {}
let keys = {
  ArrowUp: 'ArrowUp',
  ArrowLeft: 'ArrowLeft',
  ArrowDown: 'ArrowDown',
  ArrowRight: 'ArrowRight'
}

let appleX = Math.floor(Math.random() * (canvas.width - tileSize))
let appleY = Math.floor(Math.random() * (canvas.height - 100))
let snake = [
  {
    x :  tileSize * 3,
    y : 10,
  },
]

gameAlert.addEventListener('click', () => {
  gameAlert.classList.add('hide');
  startGame();
})

function startGame() {
  gamePlay();
  // window.webkitRequestAnimationFrame(gamePlay)
}

function gamePlay() {
  player.start = true;
  drawSnake()
  createFood()
  setInterval(moveSnake, 2000)
  // drawFood()
  // moveSnake()
  // window.webkitRequestAnimationFrame(gamePlay)
}
document.addEventListener('keydown', changeDirection)

function createFood() {
  ctx.fillStyle = 'red'
  ctx.fillRect(appleX, appleY, tileSize, tileSize)
}

function moveSnake() {
  const snakeHead = {
    x: snake[0].x + xDirection,
    y: snake[0].y + yDirection
  }
  console.log('before unshift', snake.length)
  snake.unshift(snakeHead)
  console.log(snake.length)
  if(snake[0].x == appleX && snake[0].y == appleY){
    console.log(`you eat apple`)
   // snake.push(snakeHead)
  }
  else{
    const tail = snake[snake.length-1];
    ctx.clearRect(tail.x, tail.y, tileSize, tileSize)
    snake.pop()
  }
  drawSnake()
}

function drawSnake() {
  ctx.fillStyle = 'yellow'
  snake.forEach(element => {
    ctx.fillRect(element.x, element.y, tileSize, tileSize)
    // ctx.strokeRect(element.x, element.y, tileSize, tileSize)
  })
}

// function clearSnake(x, y, width, height){
//   ctx.clearRect(x, y, tileSize, tileSize)
//   ctx.clearRect(x, y, tileSize, tileSize)
// }

function gameOver() {

}

// Change Direction
function changeDirection(event) {
  // up
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
}

function changeSnakePosition(){
    snake.forEach(element => {
      element.x = element.x + xDirection,
      element.y = element.y + yDirection
  })
 }
