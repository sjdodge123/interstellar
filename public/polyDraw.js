function updatePoly(object){
	var drawCords = object.drawCords;
	
	_rotate(drawCords.xPoints, drawCords.yPoints, object.angleRad, drawCords.x,drawCords.y);
	//_rotate(drawCords.gridXs, drawCords.gridYs, object.angle, drawCords.x, drawCords.y);
	if(checkBounds(object,camera)){
		_updatePolygon(drawCords.xPoints, drawCords.yPoints, object.color);
	}
	if(gridOn){
		drawWheel(drawCords.gridXs, drawCords.gridYs, drawCords.x,drawCords.y, 
		drawCords.innerR, drawCords.outerR);
	}
	return drawCords;
}
function initShipPoly(x, y){
	var drawCords = {};
	drawCords.x = x;
	drawCords.y = y;
	drawCords.xPoints = [];
	drawCords.yPoints = [];
	drawCords.gridXs = [];
	drawCords.gridYs = [];
	
	
	drawCords.xPoints.push(x, x+5, x, x-5);
	drawCords.yPoints.push(y-6,y+5,y+2,y+5);
	
	return drawCords;
	
}
function initRoundPoly(vertices,outerR,innerR, x, y, color){
	var drawCords = {};
	drawCords.xPoints = [];
	drawCords.yPoints = [];
	drawCords.innerR = innerR;
	drawCords.outerR = outerR;
	drawCords.gridXs = [];
	drawCords.gridYs = [];
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
			
			var gridX = x + outerR*Math.cos(sectors[i]);
			var gridY = y + outerR*Math.sin(sectors[i]);
			drawCords.gridXs.push(gridX);
			drawCords.gridYs.push(gridY);
	}
	drawCords.x = x;
	drawCords.y = y;
	return drawCords;
}
function drawWheel(xs,ys,x,y,innerR,outerR){
	ctx.save();
	ctx.strokeStyle = 'gray';
	ctx.beginPath();
	for(var i=0; i <= xs.length; i ++) {
		ctx.moveTo(x,y);
		ctx.lineWidth = 1;
		ctx.lineTo(xs[i],ys[i]);
		ctx.stroke();
	}
	ctx.beginPath();
	ctx.arc(x, y, outerR, 0, 2*Math.PI);
	ctx.stroke();
	
	ctx.beginPath();
	ctx.arc(x, y, innerR, 0, 2*Math.PI);
	ctx.stroke();
	ctx.restore();
}


function translatePoly(drawCords,newX,newY) {
	var xs = drawCords.xPoints;
	var ys = drawCords.yPoints;
	var diffX = newX - drawCords.x;
	var diffY = newY - drawCords.y;

	for (var i = 0; i < xs.length; i++) {
		xs[i] += diffX;
		ys[i] += diffY;
	}
	drawCords.x = newX;
	drawCords.y = newY;
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
	ctx.strokeStyle = color;
	ctx.save();
	ctx.beginPath();
	for (var i = 0; i < xPoints.length; i ++) {
		if (i == 0) {
			ctx.moveTo(xPoints[i]-camera.x+camera.offsetX, yPoints[i]-camera.y+camera.offsetY);
		}
		else {
			ctx.lineTo(xPoints[i]-camera.x+camera.offsetX, yPoints[i]-camera.y+camera.offsetY);
		}
	}
	ctx.closePath();
	ctx.stroke();
	ctx.restore();
	
}