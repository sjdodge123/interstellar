var asteroids = [],
	gameObjectList = [],
	myShip,
	cannon,
	assTard,
	oldMouseX=0,
	oldMouseY=0,
	startTest = false,
	beltObjects = [],
	asteroidSpawn;


function boardInit() {
	buildScene();
	
}

function buildScene() {
	createPlayerObjects();
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
	//startTest = true;
	
	myShip.attachToBelt(spawnAsteroidFixed(canvas.width/2+100,canvas.height/2+100));
	myShip.attachToBelt(spawnAsteroidFixed(canvas.width/2 +100,canvas.height/2-100));
	//myShip.attachToBelt(spawnAsteroidFixed(canvas.width/2+100,canvas.height/2-75));
	//beltObjects.push(spawnAsteroidFixed(canvas.width/2,canvas.height/2 +200));
}



function updateGameBoard() {
	for(var i = 0; i < gameObjectList.length;i+=1){
		if(gameObjectList[i] != null) {
			gameObjectList[i].update();
		}
	}
}