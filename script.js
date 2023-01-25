let gameAlert = document.querySelector('.gameAlert')
let canvas = document.getElementById('board')
let ctx = canvas.getContext('2d')
let tileSize = 10;
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
let foodX;
let foodY;

// let foodX = Math.floor(Math.random() * (canvas.width - tileSize))
// let foodY = Math.floor(Math.random() * (canvas.height - 100))
let snake = [
  {
    x: tileSize,
    y: 10,
  },
]
generateFood()
gameAlert.addEventListener('click', () => {
  gameAlert.classList.add('hide');
  startGame();
})

function startGame() {
  player.start = true;
  gamePlay();
}

function gamePlay() {

  // console.log(player.start)
  // if (player.start) {
  setInterval(()=>{
      if(gameOver())return ;
    clearScreen(),
    drawSnake(),
    moveSnake(),
    draw_food()
    // gameOver()
  },100)
  // }
}
document.addEventListener('keydown', changeDirection)

function random_food(min, max) {
  return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

function generateFood() {
  foodX = random_food(0, canvas.width - tileSize);
  foodY = random_food(0, canvas.height - tileSize);
  snake.forEach(function hasSnakeEatenFood(part) {
    const has_eaten = part.x == foodX && part.y == foodY;
    if (has_eaten){
      generateFood();
    } 
  });
}
function draw_food() {
  ctx.fillStyle = 'red'
  ctx.fillRect(foodX, foodY, tileSize, tileSize)
}

function drawSnakePart(snakePart){
  ctx.fillStyle = 'blue'
  ctx.fillRect(snakePart.x, snakePart.y, tileSize, tileSize)
}



function drawSnake() {
  snake.forEach(drawSnakePart)
}


function gameOver() {
  for(let i = 1 ;i <snake.length;i++){
   if( snake[i].x == snake[0].x && snake[i].y == snake[0].y ) return true;
  }
  let topOut = snake[0].y <= 0;
  let leftOut = snake[0].x <= 0 - tileSize;
  let bottomOut = snake[0].y >= canvas.height - tileSize;
  let rightOut = snake[0].x >= canvas.width - tileSize;
  return topOut || leftOut || bottomOut || rightOut 
}
function clearScreen(){
  ctx.fillStyle = '#adee5d'
ctx.fillRect(0, 0, canvas.width, canvas.height)
}
// Change Direction
function changeDirection(event) {
  // up
  if (event.keyCode == 38) {
    if (yDirection == tileSize)
      return;
    yDirection = - tileSize; //move one tile up
    xDirection = 0;
  }
  //down
  if (event.keyCode == 40) {
    if (yDirection == -tileSize)
      return;
    yDirection = tileSize;//move one tile down
    xDirection = 0;
  }
  //left
  if (event.keyCode == 37) {
    if (xDirection == tileSize)
      return;
    xDirection = -tileSize;//move one tile left
    yDirection = 0;
  }
  //right
  if (event.keyCode == 39) {
    if (xDirection == -tileSize)
      return;
    xDirection = tileSize;//move one tile right
    yDirection = 0;
  }

  changeSnakePosition()
}

function changeSnakePosition() {
  snake.forEach(element => {
    element.x = element.x + xDirection,
      element.y = element.y + yDirection
  })
}
function moveSnake() {
  const snakeHead = {
    x: snake[0].x + xDirection,
    y: snake[0].y + yDirection
  }
  snake.unshift(snakeHead)
  if (snake[0].x == foodX && snake[0].y == foodY) {
    generateFood()
  }
  else {
    snake.pop()
  }
  // drawSnake()
}