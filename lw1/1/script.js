var canvas = document.getElementById("canvas");
var canvasWidth = 500;
var canvasHeight = 500;
canvas.width = canvasWidth;
canvas.height = canvasHeight;
var canvasContext = canvas.getContext("2d");

canvasContext.lineWidth = 10;

canvasContext.strokeStyle = 'red';
canvasContext.beginPath();
canvasContext.moveTo(5,200);
canvasContext.lineTo(5,5);
canvasContext.lineTo(100,5);
canvasContext.stroke();

canvasContext.strokeStyle = 'green';
canvasContext.beginPath();
canvasContext.moveTo(120,200);
canvasContext.lineTo(120,5);
canvasContext.stroke();

canvasContext.beginPath();
canvasContext.arc(170, 50, 45, 0, 2 * Math.PI);
canvasContext.stroke();

canvasContext.strokeStyle = 'blue';
canvasContext.beginPath();
canvasContext.moveTo(240,200);
canvasContext.lineTo(240,5);
canvasContext.lineTo(290,100);
canvasContext.lineTo(340,5);
canvasContext.lineTo(340,200);
canvasContext.stroke();

