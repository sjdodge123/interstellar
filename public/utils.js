var ids = [],
permObjectList = [];

function sortArray(array){
	var swapped, temp,
		len = array.length-1;
	do {
		swapped = false;
		for(var i=0;i<len; i++){
			if(array[i] > array[i+1]){
				temp = a[i];
				a[i] = a[i+1];
				a[i+1] = temp;
				swapped = true;
			}
		}
	}
	while(swapped);
	return array;
}

function filterBounds(array, box) {
  var inBounds = [];
  for (var i = 0; i < array.length; i++) {
    if (checkBounds(array[i], box)) {
      inBounds.push(array.slice(i, i + 1)[0]);
    }
  }
  return inBounds;
}

function checkBounds(object, box, padding) {
  if (!padding) {
    var padding = 0;
  }
  if ((object.right >= box.left - padding && object.left <= box.right + padding) && (object.bottom >= box.top - padding && object.top <= box.bottom + padding)) {
    return true
  }
  return false;
}

function findMin_R(array, index){
	if(index == array.length - 1){
		return array[index];
	}

	var min = findMin_R(array,index+1);

	if(array[index] < min){
		return array[index];
	} else {
		return min;
	}

}

function findMax_R(array, index){
	if(index == array.length - 1){
		return array[index];
	}

	var max = findMax_R(array,index+1);

	if(array[index] > max){
		return array[index];
	} else {
		return max;
	}
   
}

function getRandomInt(min,max){
	return Math.floor(Math.random()*(max-min+1))+min; //min and max inclusive
}

function calcVectorMag(x1,y1,x2,y2) {
	var xDis = x2-x1;
	var yDis = y2-y1;
	var dist = Math.sqrt(Math.pow(xDis,2)+Math.pow(yDis,2));
	return {xDis:xDis,yDis:yDis,dist:dist};
}


function smartArrayAddPermItems(newItems){
	permObjectList = permObjectList.concat(newItems);
}

function smartArrayMerge(mainArray,addArray){
	for(var i=0;i<addArray.length;i++) {
		smartArrayAdd(addArray[i],mainArray);
	}
	for(var j=0;j<permObjectList.length;j++){
		smartArrayAdd(permObjectList[j],mainArray);
	}
}

function smartArrayClean(currentArray){
	for(var i=0;i<currentArray.length;i++){
		var index = permObjectList.indexOf(currentArray[i]);
		if(index != -1){
			currentArray.splice(index,1);
		}
	}
	print("Current Objects being updated: " + currentArray.length);
}

function smartArrayFilter(condition,object,array){
		if(condition) {
			smartArrayAdd(object,array);
		} else {
			smartArrayRemove(object,array);
		}
}

function smartArrayAdd(object,array) {
	if(array.indexOf(object) == -1 ) {
		array.push(object);
	}
}

function smartArrayRemove(object,array) {
	var index = array.indexOf(object);
	if(index != -1) {
		array.splice(index,1);
	}
}


function sortSweeps(sweepList) {
  var len = sweepList.length;
  for (var i = 1; i < len; i++) {
    var temp = sweepList[i];
    for (var j = i - 1; j >= 0 && sweepList[j].left > temp.left; j--) {
      sweepList[j + 1] = sweepList[j];
    }
    sweepList[j + 1] = temp;
  }
  return sweepList;
}