// variables and initialisation
const board = document.querySelector(".board");
let snake = [{
    x: 0,
    y: 0
}]
const velocity = {
    x: 1,
    y: 0
}
const food = {
    x: 5,
    y: 0
}
let temp = {}
// setInterval(main,1000)

// functions
function main() {
    nextTick();
}
function nextTick() {

    window.addEventListener("keydown", (key) => {
        switch (key.key) {
            case "ArrowUp":
                velocity.x = 0
                velocity.y = -1
                break;
            case "ArrowDown":
                velocity.x = 0
                velocity.y = 1
                break;
            case "ArrowLeft":
                velocity.x = -1
                velocity.y = 0
                break;
            case "ArrowRight":
                velocity.x = 1
                velocity.y = 0
                break;
            default:
                break;
        }
    })
    
    hasEatenFood();
    moveSnake();
    createSnake();
    makeFood();
    console.log(snake)
}
function createSnake() {
    board.innerHTML = ""
    for (let i = 0; i < snake.length; i++) {
        snakeElement = document.createElement("div")
        if (i === 0) {
            snakeElement.classList.add("snakeHead")
        }
        else {
            snakeElement.classList.add("snakeBody")
        }
        snakeElement.style.gridRowStart = `${snake[i].y}`
        snakeElement.style.gridColumnStart = `${snake[i].x}`
        board.appendChild(snakeElement)
    }
}
function moveSnake() {
    if (snake.length == 1) {
        snake[0].x += velocity.x
        snake[0].y += velocity.y
    }
    else {
        for (i = 0; i < snake.length-1; i++) {
            temp = { ...snake[i] }
            snake[i].x += velocity.x
            snake[i].y += velocity.y
            snake[i+1]={...temp}
        }
    }
}
function makeFood() {
    foodElement = document.createElement("div")
    foodElement.classList.add("food")
    foodElement.style.gridColumnStart = food.x
    foodElement.style.gridRowStart = food.y
    board.appendChild(foodElement)
}
function makeNewFood() {
    food.x = Math.floor(Math.random() * 16)
    food.y = Math.floor(Math.random() * 16)
    makeFood();
}
function hasEatenFood() {
    if (food.x == snake[0].x && food.y == snake[0].y) {
        snake.push({x:0,y:0})
        makeNewFood();
    }
}