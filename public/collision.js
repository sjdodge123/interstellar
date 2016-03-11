
function checkCollision(array, cameraBox){
	var pairList = broadBase(array,cameraBox);
	midBase(pairList);
}

function broadBase(array,cameraBox) {
	_findAllSides(array);
	sweep(array, cameraBox);
	return prune(array);
}

function sweep(array, box) {
  //var inBounds = filterBounds(array, box);
  for (var i = 0; i < array.length; i++) {
  	array[i].isHit = false;
    array[i].leftDist = findDistance(array[i].left, box.left);
    array[i].rightDist = findDistance(array[i].right, box.left);
  }
  sortSweeps(array);
}

function prune(sweepList) {
  var pairList = [],
  activeList = [],
  toRemove = [];
  activeList.push(sweepList[0]);
  
  for (var i = 1; i < sweepList.length; i++){
	  for (var j = 0; j < activeList.length; j++){
		  if (sweepList[i].leftDist >= activeList[j].rightDist){
			  toRemove.push(j);
		  }
		  else{
			  pairList.push({
				  hit1: sweepList[i],
				  hit2: activeList[j]
			  });
			  sweepList[i].isHit = true;
			  activeList[j].isHit = true;
		  }
	  }
	  for (var k = 0; k < toRemove.length; k++){
		  activeList.splice(toRemove[k],1);
	  }
	  activeList.push(sweepList[i]);
  }
  return pairList;
}

function midBase(pairList) {
	var answer = false;

	for (var i = 0; i < pairList.length; i++) {
		if(_checkIfSelf(pairList[i].hit1,pairList[i].hit2)) {
			continue;
		}
		if(checkAABCollision(pairList[i].hit1,pairList[i].hit2)) {
			if(narrowBase(pairList[i].hit1,pairList[i].hit2)) {
				answer = true;
			}
		}
	}
}

function checkAABCollision(object,testObject) {

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

function narrowBase(object , testObject) {
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