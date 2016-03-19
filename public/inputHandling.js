var moveFoward = false;
var moveBackward = false;
var turnLeft = false;
var turnRight = false;

function setupListeners(){
	canvas.addEventListener("mousemove", calcMousePos, false);
	canvas.addEventListener("click", handleClick, false);
	window.addEventListener("keydown", keyDown, false);
    window.addEventListener("keyup", keyUp, false);
}

function calcMousePos(evt){
	evt.preventDefault();
	var rect = canvas.getBoundingClientRect(),
		root = document.documentElement;
	mouseX = evt.pageX - rect.left - root.scrollLeft;
	mouseY = evt.pageY - rect.top - root.scrollTop;
}

function handleClick(evt){
    if(spawnOnClick){
        assTard = spawnAsteroidMouse(mouseX,mouseY);
    }
	evt.preventDefault();
}

function keyDown(evt){
	switch(evt.keyCode) {
    case 65: {turnLeft = true; break;} //Left key
    case 87: {moveFoward = true; break;} //Up key
    case 68: {turnRight = true; break;}//Right key
    case 83: {moveBackward = true; break;} //Down key
    case 71: {(gridOn == false ? gridOn = true : gridOn = false);  break;}
    case 121: {
    	toggleOverlay();
    	evt.preventDefault();
    	break;
        }
	}
    if(moveFoward){
    	myShip.accelY -= Math.cos((Math.PI*myShip.angle)/180) * myShip.thrust; 
    	myShip.accelX += Math.sin((Math.PI*myShip.angle)/180) * myShip.thrust; 

    }
    if(moveBackward){
    	myShip.accelY += Math.cos((Math.PI*myShip.angle)/180) * myShip.thrust; 
    	myShip.accelX -= Math.sin((Math.PI*myShip.angle)/180) * myShip.thrust;
    }
    if(turnLeft){
    	myShip.angle -= myShip.turnSpeed;
    }
    if(turnRight){
    	myShip.angle += myShip.turnSpeed;
    }
    if(socket){
    	socket.emit('movement', myShip);
    }
}

function keyUp(evt){
    switch(evt.keyCode) {
    case 65: {turnLeft = false; break;} //Left key
    case 87: {moveFoward = false; break;} //Up key
    case 68: {turnRight = false; break;}//Right key
    case 83: {moveBackward = false; break;} //Down key
    }
}
