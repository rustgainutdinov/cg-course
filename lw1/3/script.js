var canvas = document.getElementById("canvas");
var canvasWidth = 500;
var canvasHeight = 500;
canvas.width = canvasWidth;
canvas.height = canvasHeight;
var canvasContext = canvas.getContext("2d");

const R = 200;
const X1 = 250;
const Y1 = 250;
const COLOR = "#FF0000";

drawCircle(R, X1, Y1, COLOR);

function drawCircle(r, x1, y1, color) {
    //TODO: разобраться в алгоритме
    let x = 0
    let y = r
    let delta = 1 - 2 * r
    let error = 0
    canvasContext.fillStyle = color;
    while (y >= x) {
        canvasContext.fillRect(x1 + x, y1 + y, 1, 1)
        canvasContext.fillRect(x1 + x, y1 - y, 1, 1)
        canvasContext.fillRect(x1 - x, y1 + y, 1, 1)
        canvasContext.fillRect(x1 - x, y1 - y, 1, 1)
        canvasContext.fillRect(x1 + y, y1 + x, 1, 1)
        canvasContext.fillRect(x1 + y, y1 - x, 1, 1)
        canvasContext.fillRect(x1 - y, y1 + x, 1, 1)
        canvasContext.fillRect(x1 - y, y1 - x, 1, 1)
        error = 2 * (delta + y) - 1
        if ((delta < 0) && (error <= 0)) {
            delta += 2 * ++x + 1;
            continue;
        }
        if ((delta > 0) && (error > 0)) {
            delta -= 2 * --y + 1
            continue;
        }
        delta += 2 * (++x - --y);
    }
}