'use strict';

const PORT = 9000;
// const WEBSOCKET_PORT = 9002;

const express = require('express');
const assets = express();
const http = require('http');

const path = require('path');
const session = require('./session');

const assetsServer = http.Server(assets);
const io = require('socket.io')(assetsServer);
// const webSocketServer = new Server({ port: WEBSOCKET_PORT });

assets.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, '/../frontend'))
	// console.log(req.session);
	req.on("close", function() {
		// request closed unexpectedly
		console.log(req);
	});
})

assets.use('/', express.static(__dirname + '/../frontend'));

assetsServer.listen(PORT, () => {
	console.log(`Frontend running on port ${PORT}...`);
	// console.log("process.env: ", process.env);
	console.log(process);
	if (process.send) {
		process.send({ isBackendReady: true });

	}
});

console.log('Awaiting WebSocket connection...');

io.on('connection', function(socket){
	console.log("hello from webSocketServer");
	session.start(socket);
	// console.log(socket,"started connection!!!!!!!!!!!!!!!!!!!!!!");
	socket.on('close', ()=>{
		console.log(io,"socket closed!!!!!!!!!!!!!!!!!!!!!");
	})
});

process.on('SIGTERM', () => {
	assetsServer.close(() => {
		process.exit(0);
	});
});