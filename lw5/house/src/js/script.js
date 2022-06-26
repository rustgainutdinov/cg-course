const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
const scene = new THREE.Scene();
const house = new THREE.Group();
const renderer = new THREE.WebGLRenderer();
let controls = new THREE.OrbitControls(camera, renderer.domElement);

const WALL_TYPES = {
	SQUARE: 0,
	TRIANGLE: 1
};

function draw() {
	drawHouse();
	drawGrass();
}

function drawHouse() {
	drawWalls();
	drawWindows();
	drawRoof();
	drawDoor(-202, 70, 50, 0);
	drawGarageDoor(-202, -30, 50, 0);
}

function init() {
	renderer.setSize(width, height);
	renderer.setClearColor(0xcce0ff, 1);
	document.body.appendChild(renderer.domElement);

	camera.position.set(500, 500, 200);
	camera.lookAt(scene.position);

	const light = new THREE.DirectionalLight(0xffffff, 1);
	light.position.set(0, 1, 0);
	light.castShadow = true;
	scene.add(light);

	scene.add(house);
	scene.fog = new THREE.Fog(0xffffff, 10, 1500);
}

function drawWalls() {
	drawWallsBlock(0, 0, 0, 0);
	drawWallsBlock(0, 100, 0, 0);
	drawWallsBlock(0, 0, 100, 0);
	drawWallsBlock(0, 100, 100, 0);

	drawWallsBlock(0, 0, 0, 0.5);
	drawWallsBlock(-100, 0, 0, 0.5);
	drawWallsBlock(0, 0, 100, 0.5);
	drawWallsBlock(-100, 0, 100, 0.5);

	drawWallsBlock(0, 200, 0, 0.5);
	drawWallsBlock(-100, 200, 0, 0.5);
	drawWallsBlock(0, 200, 100, 0.5);
	drawWallsBlock(-100, 200, 100, 0.5);

	drawWallsBlock(-200, 0, 0, 0);
	drawWallsBlock(-200, 100, 0, 0);
	drawWallsBlock(-200, 0, 100, 0);
	drawWallsBlock(-200, 100, 100, 0);

	drawWallsBlock(0, -100, 0, 0);
	drawWallsBlock(0, -100, 0, 0.5);
	drawWallsBlock(-100, -100, 0, 0.5);
	drawWallsBlock(-200, -100, 0, 0);


	drawWallsBlock(-200, 0, 100, 1, 1);
	drawWallsBlock(0, 0, 100, 1, 1);

	drawWallsBlock(-200, 100, 200, 1, 1);
	drawWallsBlock(-200, 100, 200, 0, 1);

	drawWallsBlock(0, 100, 200, 1, 1);
	drawWallsBlock(0, 100, 200, 0, 1);
}

function drawWindows() {
	drawWindow(2, 100, 180, 0);
	drawWindow(2, -30, 80, 0);
	drawWindow(2, 100, 80, 0);

	drawWindow(-202, 100, 180, 0);
	drawWindow(-202, 150, 80, 0);
}

function drawWallsBlock(z, x, y, r, type = WALL_TYPES.SQUARE) {
	const shape = new THREE.Shape();
	if(type === WALL_TYPES.SQUARE) {
		shape.moveTo(0, 0);
		shape.lineTo(100, 0);
		shape.lineTo(100, 100);
		shape.lineTo(0, 100);
		shape.lineTo(0, 0);
	} else if(type === WALL_TYPES.TRIANGLE) {
		shape.moveTo(0, 0);
		shape.lineTo(100, 0);
		shape.lineTo(0, 100);
		shape.lineTo(0, 0);
	}

	const extrudeGeometry = new THREE.ExtrudeGeometry(shape);

	const texture = new THREE.TextureLoader().load('./src/img/wall-of-blocks.jpg');
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(0.015, 0.015);

	var material = new THREE.MeshBasicMaterial({map: texture});

	const wall = new THREE.Mesh(extrudeGeometry, material);
	wall.position.z = z;
	wall.position.x = x;
	wall.position.y = y;
	wall.rotation.y = Math.PI * r;

	house.add(wall);
}

function drawWindow(z, x, y, r) {
	const geometry = new THREE.BoxGeometry(63, 49, 0);

	const texture = new THREE.TextureLoader().load('./src/img/window.png');
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

	var material = new THREE.MeshBasicMaterial({map: texture});

	const wall = new THREE.Mesh(geometry, material);
	wall.position.z = z;
	wall.position.x = x;
	wall.position.y = y;
	wall.rotation.y = Math.PI * r;

	house.add(wall);
}

function drawDoor(z, x, y, r) {
	const geometry = new THREE.BoxGeometry(45, 90, 0);

	const texture = new THREE.TextureLoader().load('./src/img/door.png');
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

	var material = new THREE.MeshBasicMaterial({map: texture});

	const wall = new THREE.Mesh(geometry, material);
	wall.position.z = z;
	wall.position.x = x;
	wall.position.y = y;
	wall.rotation.y = Math.PI * r;

	house.add(wall);
}

function drawGarageDoor(z, x, y, r) {
	const geometry = new THREE.BoxGeometry(110, 100, 0);

	const texture = new THREE.TextureLoader().load('./src/img/garage-door.png');
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

	var material = new THREE.MeshBasicMaterial({map: texture});

	const wall = new THREE.Mesh(geometry, material);
	wall.position.z = z;
	wall.position.x = x;
	wall.position.y = y;
	wall.rotation.y = Math.PI * r;

	house.add(wall);
}

function drawRoof() {
	drawRoofGarageSide();
	drawRoofShortSide();
}

function drawRoofGarageSide() {
	const geometry = new THREE.BoxGeometry(283, 200, 0);

	const texture = new THREE.TextureLoader().load('./src/img/roof.jpg');
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(3, 2);
	texture.rotation = Math.PI / 2;
	const textureMaterial = new THREE.MeshPhongMaterial({map: texture});

	const roof = new THREE.Mesh(geometry, textureMaterial);
	house.add(roof);

	roof.rotation.x = Math.PI / 2;
	roof.rotation.y = Math.PI / 4;
	roof.position.y = 200;
	roof.position.x = 0;
	roof.position.z = -100;

	return roof;
}

function drawRoofShortSide() {
	const geometry = new THREE.BoxGeometry(141, 200, 0);

	const texture = new THREE.TextureLoader().load('./src/img/roof.jpg');
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(2, 2);
	texture.rotation = Math.PI / 2;
	const textureMaterial = new THREE.MeshPhongMaterial({map: texture});

	const roof = new THREE.Mesh(geometry, textureMaterial);
	house.add(roof);

	roof.rotation.x = Math.PI / 2;
	roof.rotation.y = -Math.PI / 4;
	roof.position.y = 250;
	roof.position.x = 150;
	roof.position.z = -100;

	return roof;
}

function drawGrass() {
	const geometry = new THREE.PlaneGeometry(10000, 10000);

	const texture = new THREE.TextureLoader().load('src/img/grass.jpg');
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(100, 100);

	const grassMaterial = new THREE.MeshPhongMaterial({map: texture});

	const grass = new THREE.Mesh(geometry, grassMaterial);

	grass.rotation.x = -0.5 * Math.PI;

	scene.add(grass);
}

function render() {
	controls.update();
	renderer.render(scene, camera);
	requestAnimationFrame(render)
}

function main() {
	init();
	draw();
	render();
}

main();