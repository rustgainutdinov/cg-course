let canvas, ctx, flag = false,
	prevX = 0,
	currX = 0,
	prevY = 0,
	currY = 0,
	dot_flag = false;

let pencilColor = "black", lineWidth = 5;

function init() {
	canvas = document.getElementById('can');
	ctx = canvas.getContext("2d");

	canvas.addEventListener("mousemove", function (e) {
		findxy('move', e)
	}, false);
	canvas.addEventListener("mousedown", function (e) {
		findxy('down', e)
	}, false);
	canvas.addEventListener("mouseup", function (e) {
		findxy('up', e)
	}, false);
	canvas.addEventListener("mouseout", function (e) {
		findxy('out', e)
	}, false);
}

function color(obj) {
	switch (obj.id) {
		case "green":
			pencilColor = "green";
			break;
		case "blue":
			pencilColor = "blue";
			break;
		case "red":
			pencilColor = "red";
			break;
		case "yellow":
			pencilColor = "yellow";
			break;
		case "orange":
			pencilColor = "orange";
			break;
		case "black":
			pencilColor = "black";
			break;
	}
}

function draw() {
	ctx.beginPath();
	ctx.moveTo(prevX, prevY);
	ctx.lineTo(currX, currY);
	ctx.strokeStyle = pencilColor;
	ctx.lineWidth = lineWidth;
	ctx.stroke();
	ctx.closePath();
}


function save() {
	let dataURL = canvas.toDataURL();
	window.open(dataURL, '_blank');
}

function findxy(res, e) {
	if(res === 'down') {
		prevX = currX;
		prevY = currY;
		currX = e.clientX - canvas.offsetLeft;
		currY = e.clientY - canvas.offsetTop;

		flag = true;
		dot_flag = true;
		if(dot_flag) {
			ctx.beginPath();
			ctx.fillStyle = pencilColor;
			ctx.fillRect(currX, currY, 2, 2);
			ctx.closePath();
			dot_flag = false;
		}
	}
	if(res === 'up' || res === "out") {
		flag = false;
	}
	if(res === 'move') {
		if(flag) {
			prevX = currX;
			prevY = currY;
			currX = e.clientX - canvas.offsetLeft;
			currY = e.clientY - canvas.offsetTop;
			draw();
		}
	}
}

document.getElementById('picField').onchange = function (evt) {
	let tgt = evt.target || window.event.srcElement,
		files = tgt.files;

	if(FileReader && files && files.length) {
		let fr = new FileReader();
		fr.onload = function () {
			console.log('qq');
			let img = new Image();
			img.addEventListener("load", function () {
				ctx.drawImage(img, 0, 0)
			}, false);
			img.src = fr.result;

		};
		fr.readAsDataURL(files[0]);
	}
};