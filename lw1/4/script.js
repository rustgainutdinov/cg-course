let canvas = document.getElementById("canvas");
let canvasWidth = 1000;
let canvasHeight = 500;
canvas.width = canvasWidth;
canvas.height = canvasHeight;
let canvasContext = canvas.getContext("2d");

const MAX_INCORRECT_ATTEMPTS = 7;

let tasks = [];

let GAME = {
	currentTaskI: 0
};

let CurrentTask = {
	incorrectAttempts: 0,
	question: "",
	word: "",
	guessedLetters: "",
	usedLetters: "",
};

function draw() {
	canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
	canvasContext.fillStyle = "#00FF00";
	canvasContext.fillRect(0, 0, 20, 500);
	canvasContext.fillRect(0, 0, 200, 20);
	canvasContext.fillStyle = "#0000FF";
	if(CurrentTask.incorrectAttempts < MAX_INCORRECT_ATTEMPTS) {
		canvasContext.fillRect(180, 10, 5, 100);
	}
	if(CurrentTask.incorrectAttempts < MAX_INCORRECT_ATTEMPTS - 1) {
		canvasContext.beginPath();
		canvasContext.arc(180, 150, 50, 0, Math.PI * 2);
		canvasContext.fill();
	}
	if(CurrentTask.incorrectAttempts < MAX_INCORRECT_ATTEMPTS - 2) {
		canvasContext.fillRect(170, 200, 20, 100);
	}
	canvasContext.strokeStyle = "#0000FF";
	canvasContext.beginPath();
	if(CurrentTask.incorrectAttempts < MAX_INCORRECT_ATTEMPTS - 3) {
		canvasContext.moveTo(180, 200);
		canvasContext.lineTo(230, 250);
	}
	if(CurrentTask.incorrectAttempts < MAX_INCORRECT_ATTEMPTS - 4) {
		canvasContext.moveTo(180, 200);
		canvasContext.lineTo(130, 250);
	}
	if(CurrentTask.incorrectAttempts < MAX_INCORRECT_ATTEMPTS - 5) {
		canvasContext.moveTo(180, 300);
		canvasContext.lineTo(230, 350);
	}
	if(CurrentTask.incorrectAttempts < MAX_INCORRECT_ATTEMPTS - 6) {
		canvasContext.moveTo(180, 300);
		canvasContext.lineTo(130, 350);
	}
	canvasContext.lineWidth = 10;
	canvasContext.stroke();
	canvasContext.font = 'bold 36px serif';
	canvasContext.fillText(CurrentTask.question, 300, 100);
	for (let i = 0; i < CurrentTask.word.length; i++) {
		canvasContext.fillRect(300 + i * 50, 200, 30, 5);
		if(CurrentTask.usedLetters.indexOf(CurrentTask.word[i]) === -1) {
			continue;
		}
		canvasContext.font = 'bold 36px serif';
		canvasContext.fillText(CurrentTask.word[i], 300 + i * 50, 190);
	}
	for (let i = 0; i < CurrentTask.guessedLetters.length; i++) {
		canvasContext.fillStyle = "#0000FF";
		if(CurrentTask.usedLetters.indexOf(CurrentTask.guessedLetters[i]) !== -1 && CurrentTask.word.indexOf(CurrentTask.guessedLetters[i]) !== -1) {
			canvasContext.fillStyle = "#00FF00";
		}
		if(CurrentTask.usedLetters.indexOf(CurrentTask.guessedLetters[i]) !== -1 && CurrentTask.word.indexOf(CurrentTask.guessedLetters[i]) === -1) {
			canvasContext.fillStyle = "#FF0000";
		}
		canvasContext.font = 'bold 36px serif';
		canvasContext.fillText(CurrentTask.guessedLetters[i], 300 + i * 50, 290);
	}
}

function initEventListeners() {
	window.addEventListener("keydown", event => {
		if(CurrentTask.guessedLetters.indexOf(event.key) === -1) {
			return;
		}
		if(CurrentTask.usedLetters.indexOf(event.key) !== -1) {
			return;
		}
		CurrentTask.usedLetters += event.key;
		if(CurrentTask.word.indexOf(event.key) === -1) {
			CurrentTask.incorrectAttempts++;
		}
		draw();
		for (let i = 0; i < CurrentTask.word.length; i++) {
			if(CurrentTask.usedLetters.indexOf(CurrentTask.word[i]) === -1) {
				return;
			}
		}
		if(GAME.currentTaskI === tasks.length - 1) {
			alert('Вы победили');
		} else {
			GAME.currentTaskI++;
			loadCurrentTask();
		}
		draw();
	})
}

function loadCurrentTask() {
	CurrentTask = {
		incorrectAttempts: 0,
		question: tasks[GAME.currentTaskI].question,
		word: tasks[GAME.currentTaskI].word,
		guessedLetters: tasks[GAME.currentTaskI].guessedLetters,
		usedLetters: "",
	}
}

async function loadTasksFromJSOM() {
	const response = await fetch("tasks.json");
	tasks = await response.json();
}

async function run() {
	await loadTasksFromJSOM();
	loadCurrentTask();
	initEventListeners();
	draw();
}

run();