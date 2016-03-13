var asteroids = [],
	gameObjectList = [],
	myShip,
	cannon,
	assTard,
	startTest = false,
	asteroidSpawn;


function boardInit() {
	buildScene();
	createPlayerObjects();
}

function buildScene() {
	buildTestScene();
}

function createPlayerObjects() {
		myShip = new ShipObject(canvas.width/2,canvas.height/2,10,30,0,'white',20);
		cannon = new Cannon(canvas.width/2,canvas.height/2,5,15,0,'red');
		myShip.weapon = cannon;
		gameObjectList.push(myShip);
		gameObjectList.push(myShip.weapon);
}

function buildTestScene(){
	startTest = true;
	spawnAsteroidFixed(120,200);
	assTard = spawnAsteroidMouse(mouseX,mouseY);
}

function updateGameBoard() {
	for(var i = 0; i < gameObjectList.length;i+=1){
		if(gameObjectList[i] != null) {
			gameObjectList[i].update();
		}
	}
}