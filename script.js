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
  console.log(player.start)
  if (player.start) {
    drawSnake()
    setInterval(createFood, 100)
    setInterval(gameOver, 100)
    setInterval(moveSnake, 100)
  }
}
document.addEventListener('keydown', changeDirection)
function createFood() {

  ctx.fillStyle = 'red'
  ctx.fillRect(foodX, foodY, tileSize, tileSize)
}
function random_food(min, max) {
  return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

function generateFood() {
  foodX = random_food(0, canvas.width - tileSize);
  foodY = random_food(0, canvas.height - tileSize);
  snake.forEach(function hasSnakeEatenFood(part) {
    const has_eaten = part.x == foodX && part.y == foodY;
    if (has_eaten) generateFood();
  });
}


function moveSnake() {
  const snakeHead = {
    x: snake[0].x + xDirection,
    y: snake[0].y + yDirection
  }
  // console.log('before unshift', snake.length)
  snake.unshift(snakeHead)
  // console.log(snake.length)
  if (snake[0].x == foodX && snake[0].y == foodY) {
    alert(`you eat apple`)
    createFood()

  }
  else {
    const tail = snake[snake.length - 1];
    ctx.clearRect(tail.x, tail.y, tileSize, tileSize)
    snake.pop()
  }
  drawSnake()
}

function drawSnake() {
  ctx.fillStyle = 'yellow'
  snake.forEach(element => {
    ctx.fillRect(element.x, element.y, tileSize, tileSize)
  })
}


function gameOver() {
  let topOut = snake[0].y <= 0;
  let leftOut = snake[0].x <= 0 - tileSize;
  let bottomOut = snake[0].y >= canvas.height - tileSize;
  let rightOut = snake[0].x >= canvas.width - tileSize;
  for (let i = 1; i < snake.length; i++) {
    let collide = snake[0].x == snake[i].x && snake[0].y == snake[i].y
    if (collide) {
      console.log(`game over`)
    }
  }
  if (topOut || leftOut || bottomOut || rightOut) {
    console.log(`You are out `)
  } else {
    console.log(`wow nice Played`)
  }
  function clearScreen() {

  }
  // console.log("You Out from left side : "+ leftOut.valueOf())
  // console.log("You Out from top side : "+ topOut)
  // console.log("You Out from bottom side : "+ bottomOut)
  // console.log("You Out from right side : "+ rightOut)
  // if(leftOut)
}

// Change Direction
function changeDirection(event) {
  // up
  if (event.keyCode == 38) {
    if (yDirection == tileSize)
      return;
    const tail = snake[snake.length - 1];
    ctx.clearRect(tail.x, tail.y, tileSize, tileSize)
    yDirection = - tileSize; //move one tile up
    xDirection = 0;
  }
  //down
  if (event.keyCode == 40) {
    if (yDirection == -tileSize)
      return;
    const tail = snake[snake.length - 1];
    ctx.clearRect(tail.x, tail.y, tileSize, tileSize)
    yDirection = tileSize;//move one tile down
    xDirection = 0;
  }
  //left
  if (event.keyCode == 37) {
    if (xDirection == tileSize)
      return;
    const tail = snake[snake.length - 1];
    ctx.clearRect(tail.x, tail.y, tileSize, tileSize)
    xDirection = -tileSize;//move one tile left
    yDirection = 0;
  }
  //right
  if (event.keyCode == 39) {
    if (xDirection == -tileSize)
      return;
    const tail = snake[snake.length - 1];
    ctx.clearRect(tail.x, tail.y, tileSize, tileSize)
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
