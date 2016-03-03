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

function findMin_R(array, index){
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

function findMax_R(array, index){
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

function makeUniqueID()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var gate = false;

    for( var i=0; i < 4; i++ ) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    for(var j=0;j<ids.length;j++){
    	if(text == ids[j]){
    		gate = true;
    		text = makeUniqueID();
    	}
    }
    if(!gate){ids.push(text);}
    return text;
}

function findDistance(x1,x2){
	return Math.abs(x2 - x1);
}