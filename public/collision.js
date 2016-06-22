var filteredSweeps = [];
function checkCollision(array){
	var pairList = broadBase(array);
	print("Objects in pairList: " + pairList);
	/*
	for(var i=0;i<pairList.length;i++){
		print("Hit1 x value" + pairList[i].hit1.x);
		print("Hit2 x value" +pairList[i].hit2.x);
		print("---");
	}
	*/
	midBase(pairList);
	return filteredSweeps;
}

function broadBase(array) {
	_findAllSides(array);
	sweep(array,camera);
	print("Objects on screen: " + filteredSweeps.length);
	print("Objects in world: " + array.length);
	return prune(filteredSweeps);
}

function sweep(array,box) {
	var condition = function(object){
			return checkBounds(object,box);
	};
	for (var i = 0; i < array.length; i++) {
		array[i].isHit = false;
		smartArrayFilter(condition(array[i]),array[i],filteredSweeps);
	}
	filteredSweeps = sortSweeps(filteredSweeps);
	return filteredSweeps;  
}

function prune(sweepList) {
  var pairList = [],
  activeList = [],
  toRemove = [];
  activeList.push(sweepList[0]);
  
  for (var i = 1; i < sweepList.length; i++){
	  for (var j = 0; j < activeList.length; j++){
		  if (sweepList[i].left >= activeList[j].right){
			  toRemove.push(j);
		  }
		  else{
			  pairList.push({
				  hit1: sweepList[i],
				  hit2: activeList[j]

			  });
			 // sweepList[i].isHit = true;
			 // activeList[j].isHit = true;
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
	//var answer = false;
	for (var i = 0; i < pairList.length; i++) {
		/*
		if(_checkIfSelf(pairList[i].hit1,pairList[i].hit2)) {
			continue;
		}
		*/
		//if(checkAABCollision(pairList[i].hit1,pairList[i].hit2)) {
			if(narrowBase(pairList[i].hit1,pairList[i].hit2)) {
				//answer = true;
			}
		//}
		
	}
}

function checkAABCollision(object,testObject) {

	if(object.top < testObject.bottom && object.top > testObject.top){
		return true;
	}

	if(object.bottom > testObject.top && object.bottom < testObject.bottom){
		return true;
	}
	return false;
}

function narrowBase(object , testObject) {
	for (i = 0, j = object.drawCords.xPoints.length-1; i < object.drawCords.xPoints.length; j = i++){
		for (k = 0, l = testObject.drawCords.xPoints.length-1; k < testObject.drawCords.xPoints.length; l = k++){
			var lineOne = [];
			var lineTwo = [];
			lineOne.push(object.drawCords.xPoints[i],object.drawCords.yPoints[i],object.drawCords.xPoints[j],object.drawCords.yPoints[j]);
			lineTwo.push(testObject.drawCords.xPoints[k],testObject.drawCords.yPoints[k],testObject.drawCords.xPoints[l],testObject.drawCords.yPoints[l]);
			var answer = checkCollisionTest(lineOne,lineTwo);
			
			//var answer = checkCollisionLine(object.drawCords.xPoints[i],object.drawCords.yPoints[i],object.drawCords.xPoints[j],object.drawCords.yPoints[j],
			//testObject.drawCords.xPoints[k],testObject.drawCords.yPoints[k],testObject.drawCords.xPoints[l],testObject.drawCords.yPoints[l])
			object.isHit = object.isHit || answer;
			testObject.isHit = testObject.isHit || answer;
			if(answer){break;}
		}
		if(answer){break;}
	}
}

function checkCollisionLine(lineAx1,lineAy1,lineAx2,lineAy2,lineBx1,lineBy1,lineBx2,lineBy2){
	var Ax = lineAx1,
	Ay = lineAy1,
	Bx = lineAx2,
	By = lineAy2,
	
	Cx = lineBx1,
	Cy = lineBy1,
	Dx = lineBx2,
	Dy = lineBy2;
	
	det1 = (Ax-Cx)*(By-Cy) - (Bx-Cx)*(Ay-Cy);
	det2 = (Ax-Dx)*(By-Dy) - (Bx-Dx)*(Ay-Dy);
	det3 = (Cx-Ax)*(Dy-Ay) - (Dx-Ax)*(Cy-Ay);
	det4 = (Cx-Bx)*(Dy-By) - (Dx-Bx)*(Cy-By);
	
	if((det1*det2 < 0)&&(det3*det4) < 0){
	return true;
	}
	return false;
}
function checkCollisionTest(lineOne,lineTwo){
	var Aone = lineOne[3]-lineOne[1],
	Bone = lineOne[0]-lineOne[2],

	Atwo = lineTwo[3]-lineTwo[1],
	Btwo = lineTwo[0]-lineTwo[2],
	//first min and max
	minXone = Math.min(lineOne[0],lineOne[2]),
	maxXone = Math.max(lineOne[0],lineOne[2]),
	minYone = Math.min(lineOne[1],lineOne[3]),
	maxYone = Math.max(lineOne[1],lineOne[3]),

	//second min and max
	minXtwo = Math.min(lineTwo[0],lineTwo[2]),
	maxXtwo = Math.max(lineTwo[0],lineTwo[2]),
	minYtwo = Math.min(lineTwo[1],lineTwo[3]),
	maxYtwo = Math.max(lineTwo[1],lineTwo[3]),

	//determinant
	det = Aone*Btwo - Atwo*Bone;
	if(det == 0){
		//parallel
	}
	else{
		//lines to inf intersect
		var Cone = Aone*lineOne[0] + Bone*lineOne[1],
		Ctwo = Atwo*lineTwo[0] + Btwo*lineTwo[1],
    
		interx = (Btwo*Cone - Bone*Ctwo)/det,
		intery = (Aone*Ctwo - Atwo*Cone)/det;
		if(interx <= maxXone && interx >= minXone && intery <= maxYone && intery>= minYone){
			if(interx <= maxXtwo && interx >= minXtwo && intery <= maxYtwo && intery>= minYtwo){
				return true;
			}
		}
        else{
			return false;
		}	
	}
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
	object.top = _findTop(object);
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