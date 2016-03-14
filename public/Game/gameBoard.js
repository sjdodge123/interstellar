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
	buildTestScene();
	//createPlayerObjects();
}



function orbit(x,y,object) {
	var xDis = object.x-x;
	var yDis = y-object.y;
	var dist = Math.sqrt(xDis*xDis+yDis*yDis);
	var angleVel = .05;

	if(yDis >= 0){
		theta = Math.acos(xDis/dist);
	} else {
		theta = Math.PI+(Math.PI - Math.acos(xDis/dist));
	}
	theta += angleVel;
	var newX = x + dist*Math.cos(theta);
	var newY = y - dist*Math.sin(theta);
	object.translate(newX,newY);
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
	
	beltObjects.push(spawnAsteroidFixed(canvas.width/2,canvas.height/2 +100));
	beltObjects.push(spawnAsteroidFixed(canvas.width/2,canvas.height/2 +200));
}

function updateBeltObjects(){
	for(var i=0;i<beltObjects.length;i++){
		beltObjects[i].translate(canvas.width/2 + (canvas.width/2 -beltObjects[i].x),canvas.height/2 + (canvas.height/2 - beltObjects[i].y));
		orbit(canvas.width/2,canvas.height/2,beltObjects[i]);
	}
	
}

function updateGameBoard() {
	updateBeltObjects();
	for(var i = 0; i < gameObjectList.length;i+=1){
		if(gameObjectList[i] != null) {
			gameObjectList[i].update();
		}
	}
}