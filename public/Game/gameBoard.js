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

function createCamera(bound) {
	cameraBound = bound;
	camera = new CameraObject(world.center.x,world.center.y,canvas.width,canvas.height);
}

function boardInit() {
	world = new WorldObject(0,0,5000,5000);
	buildScene();	
}

function buildScene() {
	//shipSpawnLoc = {x:world.center.x,y:world.center.y};
	shipSpawnLoc = {x:world.x+world.center.x/2,y:world.y+world.center.y/2};
	buildTestScene();
}

function buildTestScene(){
	collisionTestScene();
	//beltTestScene();
}

function collisionTestScene(){
	createCamera(false);
	camera.padding = 150;
	//createGravityObjects();
	spawnOnClick = true;
	spawnAsteroidFixed(world.center.x,world.center.y);
	spawnAsteroidFixed(world.center.x-200,world.center.y-200);
	assTard = spawnAsteroidMouse();
}

function beltTestScene(){
	createCamera(true);
	camera.padding = -15;
	createGravityObjects();
	createPlayerObjects();
	for(var i=0;i<500;i++){
		spawnAsteroidsRandom(null);
	}
	myShip.attachToBelt(spawnAsteroidFixed(myShip.x+100,myShip.y-100));

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
	if(!cameraBound){
		camera.update(camera.x,camera.y);
	}
	world.update();
}