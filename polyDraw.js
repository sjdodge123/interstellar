function updatePoly(drawCords){
	_rotate(drawCords.xPoints, drawCords.yPoints, drawCords.rotateSpeed,drawCords.x,drawCords.y);
	_updatePolygon(drawCords.xPoints, drawCords.yPoints, this.color);
	return drawCords;
}
function drawPoly(vertices,outerR,innerR, x, y, color){
	var drawCords = {};
	drawCords.xPoints = [];
	drawCords.yPoints = [];
	var angleStep = 2 * Math.PI / vertices,
	sectors = [];
	
	
	for(var i=0; i < (vertices); i ++) {
			var initAngle = i * angleStep;
			sectors.push(initAngle);	
	}
	
	for(var i=0; i < (vertices); i ++) {
			var theta =  sectors[i] + Math.random() * angleStep;
			var rho = innerR + Math.random() * (outerR - innerR);
			var vertX = x + Math.floor(rho * Math.cos(theta));
			var vertY = y + Math.floor(rho * Math.sin(theta));
			
			drawCords.xPoints.push(vertX);
			drawCords.yPoints.push(vertY);
	}
	
	drawCords.xPoints.push(drawCords.xPoints[0]);
	drawCords.yPoints.push(drawCords.yPoints[0]);
	
	canvasContext.strokeStyle = color;
	for(var i=0; i <= drawCords.xPoints.length; i ++) {
			canvasContext.beginPath();
		if (i == 0){
			canvasContext.moveTo(drawCords.xPoints[i],drawCords.yPoints[i]);
		}
		else {
			canvasContext.lineTo(drawCords.xPoints[i],drawCords.yPoints[i]);
		}
		canvasContext.stroke();
	}
	drawCords.x = x;
	drawCords.y = y;
	return drawCords;
}

function _rotate(xs, ys, theta,x,y){
	var mx = [ Math.cos(theta), -Math.sin(theta), 
	Math.sin(theta), Math.cos(theta)];
	
	for (var i = 0; i < xs.length; i ++) {
		var _x = xs[i] - x;
		var _y = ys[i] - y;
		
		xs[i] = x + _x * mx[0] + _y * mx[1];
		ys[i] = y + _x * mx[2] + _y * mx[3];
		
			
	}
}

function _updatePolygon(xPoints,yPoints,color){
	canvasContext.strokeStyle = color;
	canvasContext.save();
	canvasContext.beginPath();
	for (var i = 0; i < xPoints.length; i ++) {
		if (i == 0) {
			canvasContext.moveTo(xPoints[i], yPoints[i]);
		}
		else {
			canvasContext.lineTo(xPoints[i], yPoints[i]);
		}
	}
	canvasContext.stroke();
	canvasContext.restore();
}