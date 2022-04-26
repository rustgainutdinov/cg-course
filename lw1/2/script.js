var canvas = document.getElementById("canvas");
var canvasWidth = 500;
var canvasHeight = 500;
canvas.width = canvasWidth;
canvas.height = canvasHeight;
var canvasContext = canvas.getContext("2d");

canvasContext.fillStyle = 'blue'
canvasContext.fillRect(0,0,500, 300);

canvasContext.fillStyle = 'green'
canvasContext.fillRect(0,300,500, 200);

canvasContext.fillStyle = 'orange'
canvasContext.fillRect(50,200,200, 200);
canvasContext.fillStyle = 'white'
canvasContext.fillRect(60,250,100, 100);
canvasContext.fillStyle = "brown";
canvasContext.fillRect(170,220,70, 180);
canvasContext.fillStyle = "brown";
canvasContext.fillRect(170,100,50, 100);
canvasContext.fillStyle = 'red';
canvasContext.beginPath();
canvasContext.moveTo(50,200);
canvasContext.lineTo(150,100);
canvasContext.lineTo(250,200);
canvasContext.closePath();
canvasContext.fill();
canvasContext.fillStyle = "yellow";
canvasContext.fillRect(10,220,30, 180);
canvasContext.fillRect(260,220,30, 180);
canvasContext.fillRect(310,220,30, 180);
canvasContext.fillRect(360,220,30, 180);
canvasContext.fillRect(410,220,30, 180);
canvasContext.fillRect(460,220,30, 180);

