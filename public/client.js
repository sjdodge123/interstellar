var clientID = 0;

function clientConnect() {
		var socket = io();
		console.log('yo');
   		socket.on('spawnMyShip', function(packet){
			gameObjectList = packet.gameObjectList;
			clientID = packet.index;
			myShip = packet.gameObjectList[packet.index];
			window.addEventListener("keydown", handleKeys, false);
    	});

	    socket.on('updateShipList', function(newShip){
			gameObjectList[newShip.ID] = newShip;
	    });
    
	    socket.on('movement', function(packet){
			gameObjectList[packet.index].x = packet.x;
			gameObjectList[packet.index].y = packet.y;
	  	});

	  	socket.on('player has left', function(index){
			gameObjectList[index] = null;
	  	});
	  	return socket;
}