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
	beltObjects = [],
	asteroidSpawn;


function boardInit() {
	world = new WorldObject(0,0,5000,5000);
	if(cameraBound){
		camera = new CameraObject(world.width/2,world.height/2,canvas.width,canvas.height,true);
	} else {
		camera = new CameraObject(0,0,canvas.width,canvas.height, false);
	}
	buildScene();	
}

function buildScene() {

	buildTestScene();
}

function createPlayerObjects() {
		myShip = new ShipObject(world.width/2,world.height/2,10,30,0,'white',20);
		cannon = new Cannon(world.width/2,world.height/2,5,15,0,'red');
		myShip.weapon = cannon;
		gameObjectList.push(myShip);
		gameObjectList.push(myShip.weapon);
}

function buildTestScene(){
	//collisionTestScene();
	beltTestScene();
	//cameraTestScene();
}

function collisionTestScene(){
	spawnOnClick = true;
	spawnAsteroidFixed(canvas.width/2+100,canvas.height/2+100);
	assTard = spawnAsteroidMouse();
}

function beltTestScene(){
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
	world.update();
}