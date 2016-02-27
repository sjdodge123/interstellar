function checkCollision(objects, testObject, counter) {
	var answer = false;
	//var objExcluded = objects;
	//for(var i = 0; i < testObject.contains.length; i++){
	//	console.log('testing');
	//	objExcluded.splice(testObject.contains[i],1);
	//}
	for (var k = 0; k < objects.length; k++) {
		if(_checkIfSelf(objects[k],testObject)) {
			continue;
		}
		if(checkSimpleCollision(objects[k],testObject)) {
			if(checkDetailedCollision(objects[k],testObject, counter)) {
				answer = true;
				testObject.isHit = answer || testObject.isHit;
				objects[k].isHit = answer || objects[k].isHit;
				objects[k].contains.push(counter);
			}
		}
	}
	return testObject.isHit;
}

function checkSimpleCollision(object,testObject) {
	var objectSides,
	testObjectSides;

	objectSides = _findSides(object);
	testObjectSides = _findSides(testObject);


	if(objectSides.top < testObjectSides.bottom && objectSides.top > testObjectSides.top){
		if(objectSides.right > testObjectSides.left && objectSides.right < testObjectSides.right){
			return true;
		}
	}

	if(objectSides.bottom > testObjectSides.top && objectSides.bottom < testObjectSides.bottom){
		if(objectSides.left > testObjectSides.left && objectSides.left < testObjectSides.right){
			return true;
		}
	}

	if(objectSides.top < testObjectSides.bottom && objectSides.top > testObjectSides.top) {
		if(objectSides.left > testObjectSides.left && objectSides.left < testObjectSides.right){
			return true;
		}
	}

	if(objectSides.bottom > testObjectSides.top && objectSides.bottom < testObjectSides.bottom){
		if(objectSides.right > testObjectSides.left && objectSides.right < testObjectSides.right){
			return true;
		}
	}
	return false;
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
				break;
			}
		}
		//object.isHit = isHit;
		//testObject.isHit = isHit || testObject.isHit;
		return isHit;
}

function _checkIfSelf(object, testObject) {
	return object == testObject; //|| testObject.isHit;
}

function _findSides(object) {
	return {top:_findTop(object),bottom:_findBottom(object),left:_findLeft(object),right:_findRight(object)};
}

function _findTop(object) {
	return _findMin_R(object.drawCords.yPoints,0);
}
function _findBottom(object) {
	return _findMax_R(object.drawCords.yPoints,0);
}
function _findLeft(object){
	return _findMin_R(object.drawCords.xPoints,0);
}
function _findRight(object){
	return _findMax_R(object.drawCords.xPoints,0);
}

function _findMin_R(array, index){
	if(index == array.length - 1){
		return array[index];
	}

	var min = _findMin_R(array,index+1);

	if(array[index] < min){
		return array[index];
	} else {
		return min;
	}

}

function _findMax_R(array, index){
	if(index == array.length - 1){
		return array[index];
	}

	var max = _findMax_R(array,index+1);

	if(array[index] > max){
		return array[index];
	} else {
		return max;
	}

}