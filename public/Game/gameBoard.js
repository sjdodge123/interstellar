var asteroids = [],
	gameObjectList = [],
	myShip,
	cannon,
	assTard,
	camera,
	world,
	cameraBound = true,
	oldMouseX=0,
	oldMouseY=0,
	spawnOnClick = false,
	myPlanet,
	beltObjects = [],
	gravityObjects = [],
	shipSpawnLoc,
	asteroidSpawn;


function boardInit() {
	world = new WorldObject(0,0,5000,5000);
	if(cameraBound){
		camera = new CameraObject(world.center.x,world.center.y,canvas.width,canvas.height,true);
	} else {
		camera = new CameraObject(0,0,canvas.width,canvas.height, false);
	}
	buildScene();	
}

function buildScene() {
	shipSpawnLoc = {x:world.x+world.center.x/2,y:world.y+world.center.y/2};
	buildTestScene();
}

function createGravityObjects(){
	myPlanet = new Planet(world.center.x,world.center.y,400);
	gravityObjects.push(myPlanet);
}

function createPlayerObjects() {
		myShip = new ShipObject(shipSpawnLoc.x,shipSpawnLoc.y,10,30,0,'white',20);
		cannon = new Cannon(shipSpawnLoc.x,shipSpawnLoc.y,5,15,0,'red');
		myShip.weapon = cannon;
		gameObjectList.push(myShip);
		gameObjectList.push(myShip.weapon);
}

function buildTestScene(){
	collisionTestScene();
	//beltTestScene();
	//cameraTestScene();
}

function collisionTestScene(){
	//createGravityObjects();
	spawnOnClick = true;
	spawnAsteroidFixed(world.center.x,world.center.y);
	assTard = spawnAsteroidMouse();
}

function beltTestScene(){
	createGravityObjects();
	createPlayerObjects();
	for(var i=0;i<world.width/50;i++){
		spawnAsteroidsRandom(null);
	}
	myShip.attachToBelt(spawnAsteroidFixed(myShip.x+100+camera.offsetX,myShip.y-100+camera.offsetY));

}

function cameraTestScene(){
	createPlayerObjects();
	spawnAsteroidsRandom(null);
	spawnAsteroidsRandom(null);
	spawnAsteroidsRandom(null);
	spawnAsteroidsRandom(null);
}



function updateGameBoard() {
	for(var i = 0; i < gameObjectList.length;i+=1){
		if(gameObjectList[i] != null) {
			gameObjectList[i].update();
		}
	}
	for(var j=0;j<gravityObjects.length;j++){
		gravityObjects[j].update();
	}
	world.update();
}