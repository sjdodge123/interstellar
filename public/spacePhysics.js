function updatePhysics(object) {
	updateVelocity(object);
	return updatePosition(object);
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
	object.velX = object.accelX;
	object.velY = object.accelY;
}

function findVelocity(){
	return {velX:20,velY:1};
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