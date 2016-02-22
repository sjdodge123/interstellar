function checkCollision(objects, testObject){
	for (var k = 0; k < objects.length; k++){
		if(objects[k] == testObject){
			continue;
		}
		if(checkSimpleCollision(objects[k],testObject)){
			checkDetailedCollision(objects[k],testObject);
		}
	}
}

function checkSimpleCollision(object,testObject){
	return true;
}

function checkDetailedCollision(object , testObject) {
		var len = object.drawCords.xPoints.length,
		isHit = false;
		
		for(var k = 0;k < testObject.drawCords.xPoints.length; k++) {
			var testX = testObject.drawCords.xPoints[k];
			var testY = testObject.drawCords.yPoints[k];
			for (var i = 0, j = len-1; i < len; j = i++){
				var xi = object.drawCords.xPoints[i], yi = object.drawCords.yPoints[i];
				var xj = object.drawCords.xPoints[j], yj = object.drawCords.yPoints[j];
	        
				var intersect = ((yi > testY) != (yj > testY))
					&& (testX < (xj - xi) * (testY - yi) / (yj - yi) + xi);
				if (intersect) isHit = !isHit;
			}

			if(isHit){
				console.log('Found hit');
				break;
			}
		}

		object.isHit = isHit;
		testObject.isHit = isHit;
		return isHit;
}