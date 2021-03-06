function updatePhysics(object) {
	calculateGravity(object);
	updateVelocity(object);
	var displacement = updatePosition(object);
	return displacement;
}

function calculateGravity(object){

	for(var i=0;i<gravityObjects.length;i++){
		var gravObj = gravityObjects[i];
		var values = calcVectorMag(object.x,object.y,gravObj.x,gravObj.y);
		if(values.dist < gravObj.gravityRadius){
			var gravCont = gravObj.gravityConst/values.dist;
			object.gravAccelX += gravCont * values.xDis/values.dist;
			object.gravAccelY += gravCont * values.yDis/values.dist;
		}
		if(values.dist <= gravObj.radius*1.1){
			//Collision occur!


			//React
			object.velX = -object.velX;
			object.velY = -object.velY;
		}
	}
}

function updatePosition(object) {
	var displacement = {x:object.x,y:object.y};
	object.x += object.velX;
	object.y += object.velY;
	displacement.x = object.x - displacement.x;
	displacement.y = object.y - displacement.y;
	return displacement;
}

function updateVelocity(object) {
	object.velX += object.accelX*dt + object.gravAccelX*dt -.025*object.velX;
	object.velY += object.accelY*dt + object.gravAccelY*dt -.025*object.velY;
	object.gravAccelX = 0;
	object.gravAccelY = 0;
}

function updateRotation(object) {
	object.oldAngleRad = object.angle*Math.PI/180;
	object.rotateRate += object.rotateAccel*dt -.05*object.rotateRate;
	object.angle += object.rotateRate*dt;
}

function updatePlayerInput(object){
	if(moveForward){
    	myShip.accelY = -Math.cos((Math.PI*myShip.angle)/180) * myShip.thrust; 
    	myShip.accelX = Math.sin((Math.PI*myShip.angle)/180) * myShip.thrust; 

    }
    if(moveBackward){
    	myShip.accelY = Math.cos((Math.PI*myShip.angle)/180) * myShip.thrust; 
    	myShip.accelX = -Math.sin((Math.PI*myShip.angle)/180) * myShip.thrust;
    }
    if(!moveForward && !moveBackward){
		object.accelY = 0; 
        object.accelX = 0;
    }
    if(turnLeft){
    	myShip.rotateAccel = -myShip.turnSpeed;
    }
    if(turnRight){
    	myShip.rotateAccel = myShip.turnSpeed;
    }
    if(!turnRight && !turnLeft){
    	object.rotateAccel = 0;
	
    }
}

function orbitPoint(x,y,object){
	var xDis = object.x-x;
	var yDis = y-object.y;
	var dist = Math.sqrt(xDis*xDis+yDis*yDis);
	var angleVel = .09;

	if(yDis >= 0){
		object.theta = Math.acos(xDis/dist);
	} else {
		object.theta = Math.PI+(Math.PI - Math.acos(xDis/dist));
	}
	object.theta += angleVel;
	
	var newX = x + dist*Math.cos(object.theta);
	var newY = y - dist*Math.sin(object.theta);
	object.translate(newX,newY);
}