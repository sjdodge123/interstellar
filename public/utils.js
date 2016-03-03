var ids = [];

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

function sortSweeps(sweepList) {
  var len = sweepList.length;
  for (var i = 1; i < len; i++) {
    var temp = sweepList[i];
    for (var j = i - 1; j >= 0 && sweepList[j].leftDist > temp.leftDist; j--) {
      sweepList[j + 1] = sweepList[j];
    }
    sweepList[j + 1] = temp;
  }
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

function findDistance(x, x1) {
  return x - x1;
}