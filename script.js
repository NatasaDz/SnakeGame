const boardBg = '#ecf0f1';
const snakeColor = '#54a0ff';

let snake = [
	{x: 200, y: 200},
	{x: 190, y: 200},
	{x: 180, y: 200},
	{x: 170, y: 200},
	{x: 160, y: 200}
]

let scoreTracker = 0;
let changeDirection = false;

let foodX;
let foodY;

// horizontal velocity
let dx = 10;
// vertical velocity
let dy = 0;

const snakeboard = document.querySelector('.snakeBoard');
const boardCtx = snakeboard.getContext('2d');

const startBtn = document.querySelector('.startBtn');

startGame = () => {
	startBtn.addEventListener('click', () => {
		startBtn.style.display = 'none';
		main();
	});
}

startGame();

generateFood = () => {
	randomFood = (min, max) => {
		return Math.round((Math.random() * (max-min) + min) / 10) * 10;
	}
	foodX = randomFood(0, snakeboard.width - 10);
	foodY = randomFood(0, snakeboard.height - 10);
	snake.forEach(snakeEatenFood = (part) => {
		const hasEaten = part.x == foodX && part.y == foodY;
		if (hasEaten) generateFood();
	});
 }

generateFood();

// up, right, down, left
changeDirection = (e) => {
	const leftKey = 37;
	const rightKey = 39;
	const upKey = 38;
	const downKey = 40;

	if (changeDirection) return;
	changeDirection = true;
	const keyPressed = e.keyCode;
	const goingUp = dy === -10;
	const goingDown = dy === 10;
	const goingRight = dx === 10;
	const goingLeft = dx === -10;
	if (keyPressed === leftKey && !goingRight) {
		dx = -10;
		dy = 0;
	}
	if (keyPressed === upKey && !goingDown) {
		dx = 0;
		dy = -10;
	}
	if (keyPressed === rightKey && !goingLeft) {
		dx = 10;
		dy = 0;
	}
	if (keyPressed === downKey && !goingUp) {
		dx = 0;
		dy = 10;
	}
 }

document.addEventListener('keydown', changeDirection);

main = () => {
	 if (gameOver()) {
			const endGame = document.querySelector('.endGame');
			const endGameScore = document.querySelector('.endGameScore');
			endGame.style.display = 'flex';
			endGameScore.innerText = `Your score is ` + scoreTracker;
			return;
	 };

	changeDirection = false;

	// 60fps = 1000/60 = 16
	// setTimeout(() => {
	// 	clearBoard();
	// 	drawFood();
	// 	moveSnake();
	// 	drawSnake();
	// 	main();
	// }, 1000 / 60);



	setTimeout(() => {
		clearBoard();
		drawFood();
		moveSnake();
		drawSnake();
		main();
	}, 1000 / 20);
}

clearBoard = () => {
	boardCtx.fillStyle = boardBg;
	boardCtx.fillRect(0, 0, snakeboard.width, snakeboard.height);
	boardCtx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}

// square for food
drawFood = () => {
	boardCtx.fillStyle = '#00d2d3';
	boardCtx.strokestyle = 'darkgreen';
	boardCtx.fillRect(foodX, foodY, 10, 10);
	boardCtx.strokeRect(foodX, foodY, 10, 10);
}

// one snake part
drawSnakePart = (snakePart) => {
	boardCtx.fillStyle = snakeColor;
	boardCtx.fillRect(snakePart.x, snakePart.y, 10, 10);
}

// whole snake
drawSnake = () => {
	snake.forEach(drawSnakePart);
}

gameOver = () => {
	for (let i = 4; i < snake.length; i++) {
		if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
	}

	const hitLeftWall = snake[0].x < 0 + 10;
	const hitRightWall = snake[0].x > snakeboard.width - 20;
	const hitToptWall = snake[0].y < 0 + 10;
	const hitBottomWall = snake[0].y > snakeboard.height - 20;
	return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall;
}

moveSnake = () => {
	const snakeHead = {x: snake[0].x + dx, y: snake[0].y + dy};
	snake.unshift(snakeHead);
	const hasEatenFood = snake[0].x === foodX && snake[0].y === foodY;
	if (hasEatenFood) {
		scoreTracker += 1;
		document.querySelector('.scoreTracker').innerHTML = scoreTracker;
		generateFood();
	} else snake.pop();
}

