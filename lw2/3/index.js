let canvas = document.getElementById("canvas");
let canvasWidth = 1500;
let canvasHeight = 500;
canvas.width = canvasWidth;
canvas.height = canvasHeight;
let canvasContext = canvas.getContext("2d");

let tasks = [
	{
		questionImages: ['src/image/1/q1.jpg', 'src/image/1/q2.jpg'],
		answerImages: ['src/image/1/a1.jpg', 'src/image/1/a2.jpg'],
		correctAnswers: {0: [0], 1: [1]}
	},
	{
		questionImages: ['src/image/2/q1.jpg', 'src/image/2/q2.jpg'],
		answerImages: ['src/image/2/a1.jpg', 'src/image/2/a2.jpg', 'src/image/2/a3.jpg', 'src/image/2/a4.jpg'],
		correctAnswers: {0: [0, 2], 1: [1]}
	},
	{
		questionImages: ['src/image/3/q1.jpg', 'src/image/3/q2.jpg'],
		answerImages: ['src/image/3/a1.jpg', 'src/image/3/a2.jpg', 'src/image/3/a3.jpg', 'src/image/3/a4.jpg', 'src/image/3/a5.png'],
		correctAnswers: {0: [0, 2], 1: [1, 4]}
	},
];

let GAME = {
	currentTaskI: 0,
	currentTask: {},
	currentDraggable: null
};

function drawTask() {
	canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
	GAME.currentTask.questions.forEach(question => canvasContext.drawImage(question.image, question.x, question.y, question.width, question.height), false);
	GAME.currentTask.answers.forEach(answer => canvasContext.drawImage(answer.image, answer.x, answer.y, answer.width, answer.height), false);
	requestAnimationFrame(drawTask)
}

function buildBlocks(task) {
	let questions = [];
	task.questionImages.forEach((questionImage, i) => {
		let img = new Image();
		img.src = questionImage;
		questions.push({
			i: i,
			image: img,
			x: i * 400,
			y: 0,
			width: 300,
			height: 300
		})
	});
	let answers = [];
	task.answerImages.forEach((answerImage, i) => {
		let img = new Image();
		img.src = answerImage;
		answers.push({
			i: i,
			image: img,
			x: i * 250,
			y: 300,
			width: 200,
			height: 200
		})
	});

	let winScore = 0;
	for (const correctQuestion in task.correctAnswers) {
		winScore += task.correctAnswers[correctQuestion].length;
	}

	return {
		answers,
		questions,
		correctAnswers: task.correctAnswers,
		score: 0,
		winScore
	}
}

function makeTask() {
	GAME.currentTask = buildBlocks(tasks[GAME.currentTaskI]);
}

function initEventListeners() {
	window.addEventListener('mousedown', event => {
		GAME.currentTask.answers.forEach(answer => {
			if(isPointInRect(answer.x, answer.y, answer.width, answer.height, event.clientX, event.clientY)) {
				GAME.currentDraggable = answer;
			}
		});
	});
	window.addEventListener('mousemove', event => {
		if(!GAME.currentDraggable) {
			return
		}
		GAME.currentDraggable.x = event.clientX;
		GAME.currentDraggable.y = event.clientY;
	});
	window.addEventListener('mouseup', event => {
		if(!GAME.currentDraggable) {
			return
		}
		for (const correctQuestion in GAME.currentTask.correctAnswers) {
			let question = GAME.currentTask.questions[correctQuestion];
			if(isPointInRect(question.x, question.y, question.width, question.height, event.clientX, event.clientY)) {
				if(GAME.currentTask.correctAnswers[correctQuestion].indexOf(GAME.currentDraggable.i) !== -1) {
					GAME.currentTask.score++;
				} else {
					alert('You loose');
					window.location.reload();
				}
			}
		}
		if(GAME.currentTask.score === GAME.currentTask.winScore) {
			alert('You win this level');
			GAME.currentTaskI++;
			if(GAME.currentTaskI === tasks.length) {
				alert('You win this game! Do you want to play again?');
				window.location.reload();
			} else {
				makeTask();
			}
		}
		GAME.currentDraggable = null;
	});
}

function isPointInRect(rectX, rectY, rectW, rectH, x, y) {
	return x > rectX && x < rectX + rectW && y > rectY && y < rectY + rectH
}

initEventListeners();
makeTask();
drawTask();