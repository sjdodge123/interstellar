var asteroids = [],
	gameObjectList = [],
	myShip,
	cannon,
	assTard,
	startTest = false,
	myguy,
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
	
	myguy = spawnAsteroidFixed(600,400);
	//assTard = spawnAsteroidMouse(mouseX,mouseY);
}

function updateGameBoard() {
	
	orbit(canvas.width/2,canvas.height/2,myguy);

	for(var i = 0; i < gameObjectList.length;i+=1){
		if(gameObjectList[i] != null) {
			gameObjectList[i].update();
		}
	}
}