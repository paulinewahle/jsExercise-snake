let gameBoard;
let pointCounter = 0;
let countDisplay = document.createElement("h2");
document.body.appendChild(countDisplay);
countDisplay.innerHTML = pointCounter;
let fieldsNumber = 20;
let fieldSize = 32;
let positionX = 10;
let positionY = 10;
let headPosition = {x:positionX, y:positionY};
let moveX = 0;
let moveY = 0;
let foodPositionX = Math.floor(Math.random()*fieldsNumber);
let foodPositionY = Math.floor(Math.random()*fieldsNumber);
let foodColor = Math.floor(Math.random()*4);
let tailObjectArray = [];
let tailLengthCounter = 0;
let increaseSpeed = 1;
let frameRateNumber = 5;
const eatSound = new Audio("sounds/eat.wav");
const boomSound = new Audio("sounds/boom.wav");
let keyCombinations = [];

//function preload() {
	// Ensure the .ttf or .otf font stored in the assets directory
	//font = loadFont('assets/SourceSansPro-Regular.otf');
	
	//eatSound = loadSound("eat.mp3");
//}

function setup() {
	gameBoard = createCanvas(640,640);
	frameRate(frameRateNumber);
};

function draw() {
	
//*create board
	background(242,233,228);
	//stroke(34,34,59);
	strokeWeight(10);
	line(0,0,640,0);

	
	for (var x = 0; x < width; x += width / 20) {
		for (var y = 0; y < height; y += height / 20) {
		stroke(201,173,167);
		strokeWeight(1);
		line(x, 0, x, height);
		line(0, y, width, y);
		}
	};
	
	//*create snake
	fill(74,78,105);
	rect(positionX * fieldSize, positionY * fieldSize, fieldSize, fieldSize);
	
	//*create snake tail
	tailObjectArray.push({x: positionX, y: positionY});//pushing an object!
	for(i = 0; i < tailObjectArray.length; i++) {
		//*draw the new square into the snake:
		rect(tailObjectArray[i].x * 32, tailObjectArray[i].y * 32, 32,32); 
	}

	//*cut to actual tail length
	if(tailObjectArray.length > tailLengthCounter){
		tailObjectArray.shift(); //shift removes the first array element. doesn't matter what the element is but the array length get constantly shortened by one
	}

	//*move snake position
	positionX = positionX + moveX;
	positionY = positionY + moveY;
	
	//*keep it inside
	if(positionY < 0) {
		positionY = 19;
		console.log("End-game");
		gameOver();
	};
	if(positionY > 19){
		positionY = 0;
	};
	if(positionX < 0) {
		positionX = 19;
	};
	if(positionX > 19) {
		positionX = 0;
	};
	
	//*create food 
	fill (154,140,152);
	rect(foodPositionX * fieldSize, foodPositionY * fieldSize, fieldSize, fieldSize);
	//grow tail
	
	//*eat
	if (positionX === foodPositionX && positionY === foodPositionY){
		//*play sound
		eatSound.play();
		console.log(tailObjectArray);
		//*change food position
		foodPositionX = Math.floor(Math.random()*fieldsNumber);
		foodPositionY = Math.floor(Math.random()*fieldsNumber);
		
		//*grow tail
		tailLengthCounter++;

		//*update score
		pointCounter++;
		countDisplay.innerHTML = pointCounter;
		
		//*increse speed every 3rd time
		function increaseSpeedFunction(){
			if(increaseSpeed === 1){
				increaseSpeed = 2;
			}
			else if(increaseSpeed === 2){
				increaseSpeed = 3;
			}
			else if(increaseSpeed === 3){
				frameRateNumber++;
				frameRate(frameRateNumber);
				increaseSpeed = 1;
			}
		}
		increaseSpeedFunction(); //?why do I have to call this but not game over?
		
		}

	
	//*runs into itself
	let singleArrayElement;
	for(singleArrayElement = 0; singleArrayElement < tailObjectArray.length; singleArrayElement++){//loop through every array object
	if(positionX === tailObjectArray[singleArrayElement].x &&  positionY === tailObjectArray[singleArrayElement].y){
		console.log("crash");
		
		let collisionPositionX = tailObjectArray[singleArrayElement].x;
		let collisionPositionY = tailObjectArray[singleArrayElement].y;
		
		let spliceKey = tailObjectArray[singleArrayElement];
		
		console.log(collisionPositionX);
		console.log(collisionPositionY);
		console.log(spliceKey);
		
	
		if (tailObjectArray.includes(spliceKey)){ 	//position der kombination(object im array[] = ?; splice at ?

		let spliceKeyArrayPosition = tailObjectArray.indexOf(spliceKey);
		tailObjectArray = tailObjectArray.splice(spliceKeyArrayPosition);
		tailLengthCounter = tailObjectArray.length;
		console.log(tailObjectArray);
		pointCounter = tailObjectArray.length;
		countDisplay.innerHTML = pointCounter;
		};

	}
	}
	

};
// 12/21 21/12 3/4 4/3
function keyPressed() {
	if (keyCode === UP_ARROW){
		moveX = 0;
		moveY = -1;
		keyCombinations.push(1);
		console.log(keyCombinations);
	}
	else if (keyCode === DOWN_ARROW){
		moveX = 0;
		moveY = 1;
		keyCombinations.push(2);
		console.log(keyCombinations);
	}
	else if (keyCode === LEFT_ARROW){
		moveX = -1;
		moveY = 0;
		keyCombinations.push(3);
		console.log(keyCombinations);
	}
	else if (keyCode === RIGHT_ARROW){
		moveX = 1;
		moveY = 0;
		keyCombinations.push(4);
		
	}
	//*180 degree turn
	let keyCombinationJoined = keyCombinations.join("");
	console.log("joined" + keyCombinationJoined);

	upDown = keyCombinationJoined.search(12);
	downUp = keyCombinationJoined.search(21);
	leftRight = keyCombinationJoined.search(34);
	rightLeft = keyCombinationJoined.search(43);

	if(upDown !== -1 || downUp !== -1 || leftRight !== -1 || rightLeft !== -1){
		console.log("found");
		tailObjectArray = [];
		tailLengthCounter = 0;
		keyCombinations = [];
		}
		/*function findCombination(){
			console.log(value);
		}
		if (keyCombinationJoined.find(12)==true){
			console.log("found");
		}
*/
};
//180 degree turn
/*if (headPosition === tailObjectArray[0]){ 
	console.log("dupdiduuu");
}*/

function gameOver(){
	fill(34,34,59);
	textSize(50);
	textField = text('GAME OVER',50,150);
	text('GAME OVER',50,150);
	boomSound.play();
	positionX=10;
	positionY=10;
	pointCounter = 0;
	countDisplay.innerHTML = pointCounter;
	moveX = 0;
	moveY = 0;
	tailObjectArray = [];
	tailLengthCounter = 0;
	increaseSpeed = 1;
	frameRateNumber = 5;
	//let lostText = createP('GAME OVER');//draw on top of canvas
	//background(242,233,228,0.9);
};
