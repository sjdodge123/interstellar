
function spawnAsteroidsRandom(evt) {
	var inner = 4 + Math.floor(Math.random() * 30);
	var outer = inner + Math.floor(Math.random() * inner);

	var assTard = new Asteroid(Math.random() * world.width+camera.offsetX, Math.random() * world.height+camera.offsetY,inner,outer,0,'white');
	asteroids.push(assTard);
	gameObjectList.push(assTard);
}

function spawnAsteroidFixed(x,y) {

	var assTard = new Asteroid(x,y,20,60,0,'white');
	asteroids.push(assTard);
	gameObjectList.push(assTard);
	return assTard;
}

function spawnAsteroidMouse() {
	var inner = 4 + Math.floor(Math.random() * 30);
	var outer = inner + Math.floor(Math.random() * inner);

	var assTard = new Asteroid(mouseX,mouseY,inner,outer,0,'white');
	asteroids.push(assTard);
	gameObjectList.push(assTard);
	return assTard;
}


//If server is loading this file, used by the server to spawn ships
if(exports) {
	exports.createShipObject = (function() {
		return new ShipObject(500,500,10,30,0,'white',20);
	})();

	exports.createCannonObject = (function () {
		return new Cannon(500,500,5,15,0,'red');
	})();
}
