var pairList = [];

function broadBase(array,cameraBox) {
	_findAllSides(array);
  	pairList = prune(sweep(array, cameraBox));
}

function sweep(array, box) {
  var sweepList = [];
  
  var inBounds = filterBounds(array, box);
  for (var i = 0; i < inBounds.length; i++) {
    inBounds[i].leftDist = findDistance(inBounds[i].left, box.left);
    inBounds[i].rightDist = findDistance(inBounds[i].right, box.left);
    sweepList.push(inBounds[i]);
  }
  sortSweeps(sweepList);
  return sweepList;
}

function prune(sweepList) {
  var pairList = [],
    len = sweepList.length - 1;
  for (var i = 0; i < len; i++) {
    for (var j = i + 1; j < len + 1; j++) {
      if (sweepList[i].rightDist >= sweepList[j].leftDist) {
        pairList.push({
          hit1: sweepList[i],
          hit2: sweepList[j]
        });
      }
    }

  }
  return pairList;
}

function checkCollision(objects, testObject, counter) {
	var answer = false;

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

	if(object.top < testObject.bottom && object.top > testObject.top){
		if(object.right > testObject.left && object.right < testObject.right){
			return true;
		}
	}

	if(object.bottom > testObject.top && object.bottom < testObject.bottom){
		if(object.left > testObject.left && object.left < testObject.right){
			return true;
		}
	}

	if(object.top < testObject.bottom && object.top > testObject.top) {
		if(object.left > testObject.left && object.left < testObject.right){
			return true;
		}
	}

	if(object.bottom > testObject.top && object.bottom < testObject.bottom){
		if(object.right > testObject.left && object.right < testObject.right){
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

function _findAllSides(array){
	for(var i=0;i<array.length;i++){
		_findSides(array[i]);
	}
}

function _findSides(object) {
	object.top =_findTop(object);
	object.bottom = _findBottom(object);
	object.left = _findLeft(object);
	object.right = _findRight(object);
}

function _findTop(object) {
	return findMin_R(object.drawCords.yPoints,0);
}
function _findBottom(object) {
	return findMax_R(object.drawCords.yPoints,0);
}
function _findLeft(object){
	return findMin_R(object.drawCords.xPoints,0);
}
function _findRight(object){
	return findMax_R(object.drawCords.xPoints,0);
}