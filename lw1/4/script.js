var canvas = document.getElementById("canvas");
var canvasWidth = 500;
var canvasHeight = 500;
canvas.width = canvasWidth;
canvas.height = canvasHeight;
var canvasContext = canvas.getContext("2d");

const MAX_INCORRECT_ATTEMPTS = 7;

var GAME = {
    incorrectAttempts: 0
}

function draw() {
    canvasContext.fillStyle = "#00FF00";
    canvasContext.fillRect(0, 0, 20, 500);
    canvasContext.fillRect(0, 0, 200, 20);
    canvasContext.fillStyle = "#0000FF";
    if (GAME.incorrectAttempts < MAX_INCORRECT_ATTEMPTS) {
        canvasContext.fillRect(180, 10, 5, 100);
    }
    if (GAME.incorrectAttempts < MAX_INCORRECT_ATTEMPTS - 1) {
        canvasContext.beginPath();
        canvasContext.arc(180, 150, 50, 0, Math.PI * 2);
        canvasContext.fill();
    }
    if (GAME.incorrectAttempts < MAX_INCORRECT_ATTEMPTS - 2) {
        canvasContext.fillRect(180, 10, 5, 100);
    }
}

draw();