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
	pickupClick = false,
	beltEnabled = false,
	myPlanet,
	beltObjects = [],
	gravityObjects = [],
	importantObjects = [],
	shipSpawnLoc,
	asteroidSpawn;


function createGravityObjects(){
	myPlanet = new Planet(world.center.x,world.center.y,world.width/100);
	gravityObjects.push(myPlanet);
}

function createPlayerObjects() {
		myShip = new ShipObject(shipSpawnLoc.x,shipSpawnLoc.y,10,30,0,'white',20);
		//myShip.weapon = new Cannon(shipSpawnLoc.x,shipSpawnLoc.y,5,15,0,'red');
		gameObjectList.push(myShip);
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
	importantObjects = checkGravityObjects();
	gameUpdateList.addPermArray(importantObjects);
}

function collisionTestScene(){
	spawnOnClick = true;
	createCamera(false);
	camera.padding = 150;
	//createGravityObjects();
	spawnInitialMouseAsteroid();
	spawnAsteroidFixed(world.center.x,world.center.y);
	spawnAsteroidFixed(world.center.x-200,world.center.y-200);
	
}

function beltTestScene(){
	beltEnabled = true;
	createCamera(true);
	camera.padding = -1;
	spawnInitialMouseAsteroid();
	createGravityObjects();
	createPlayerObjects();
	for(var i=0;i<world.width/10;i++){
		spawnAsteroidsRandom(null);
	}
	myShip.attachToBelt(spawnAsteroidFixed(myShip.x+100,myShip.y-100));
	
}

function spawnInitialMouseAsteroid(){
	if(spawnOnClick){
		assTard = spawnAsteroidMouse();
	}
}

function updateGameBoard() {
	var updateList = gameUpdateList.currentUpdateList;
	for(var i = 0; i < updateList.length;i+=1){
		if(updateList[i] != null) {
			updateList[i].update();
		}
	}
	for(var j = 0; j < gravityObjects.length;j+=1){
		gravityObjects[j].update();
	}
	
	if(!cameraBound){
		camera.update(camera.x,camera.y);
	}
	if(myShip){
		myShip.update();
	}
	world.update();
}

function checkGravityObjects(){
	var listAdditions = [];
	var condition = function (x1,y1,x2,y2,radius){
		return calcVectorMag(x1,y1,x2,y2).dist < radius;
	};
	for(var i=0;i<gravityObjects.length;i++){
		for(var j=0;j<gameObjectList.length;j++){
			smartArrayFilter(condition(gameObjectList[j].x,gameObjectList[j].y,gravityObjects[i].x,gravityObjects[i].y,gravityObjects[i].gravityRadius),gameObjectList[j],listAdditions);
		}
	}
	return listAdditions;
}

function findObjectsUnderPoint(x,y){
	var updateList = gameUpdateList.currentUpdateList;
	for(var i=0;i<updateList.length;i++){
		if(checkBoundsPoint(x,y,updateList[i])){
			return updateList[i];
		}
	}
	return false;
}