var asteroids = [],
	gameObjectList = [],
	myShip,
	cannon,
	assTard,
	asteroidSpawn;

function buildGameObjects() {
	spawnAsteroidFixed(120,200);
	//spawnAsteroidFixed(200,200);
	//spawnAsteroidMouse(mouseX,mouseY);
	//asteroidSpawn = setInterval(spawnAsteroidRandom,1000);
}

function createGameObjects() {
		myShip = new ShipObject(canvas.width/2,canvas.height/2,10,30,0,'white',20);
		cannon = new Cannon(canvas.width/2,canvas.height/2,5,15,0,'red');
		myShip.weapon = cannon;
		gameObjectList.push(myShip);
		gameObjectList.push(myShip.weapon);
}