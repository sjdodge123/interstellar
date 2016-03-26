var express = require('express')
  , http = require('http');
var app = express();
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
var server = http.createServer(app);
var io = require('socket.io').listen(server);
//var objects =  require("./public/spaceObjects.js");

/*
var clientID = 0;
var client = {};
var gameObjectList = [];
var maxObjects = 20000;


io.on('connection', function(socket){
	clientID = findEmptySlot();
	client[socket.id] = clientID;
	var newShip = createNewShip();
	newShip.ID = clientID;
	gameObjectList[clientID] = newShip;
	console.log('User '+ client[socket.id] + ' has joined.');
	socket.emit('spawnMyShip',{gameObjectList:gameObjectList,index:clientID});
	socket.broadcast.emit('updategameObjectList',newShip);

	socket.on('movement', function(ship){
		gameObjectList[client[socket.id]].x = ship.x;
		gameObjectList[client[socket.id]].y = ship.y;
		socket.broadcast.emit('movement',{index:ship.ID, x:ship.x,y:ship.y});
	});

	socket.on('disconnect', function() {
		socket.broadcast.emit('player has left',client[socket.id]);
		gameObjectList[client[socket.id]] = null;

		console.log('User '+ client[socket.id] + ' disconnected.');
  	});

});

function createNewShip(){
	var myShip = require("./public/spaceObjects.js").createShipObject;
	var cannon = require("./public/spaceObjects.js").createCannonObject;
	myShip.weapon = cannon;
	return myShip;
}

function setMaxPlayers(){
	for(var i=0; i<maxObjects;i+=1){
		gameObjectList.push(null);
	}
}

function findEmptySlot(){
	for(var i=0;i<gameObjectList.length;i+=1){
		if(gameObjectList[i] == null) {
			return i;
		}
	}
}
*/

server.listen(80, function(){
	//setMaxPlayers();
	console.log('listening on *:80');
});
