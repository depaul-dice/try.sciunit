'use strict';

const PORT = 9000;
// const WEBSOCKET_PORT = 9002;

const http = require('http');
const express = require('express');
const { Server } = require('ws');
const session = require('./session');

const assets = express();
const assetsServer = http.createServer(assets);
const path = require('path');
const webSocketServer = new Server({ server: assetsServer });
// const webSocketServer = new Server({ port: WEBSOCKET_PORT });

assets.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, '/../frontend'))
})

assets.use('/', express.static(__dirname + '/../frontend'));

assetsServer.listen(PORT, () => {
	console.log(`Frontend running on port ${PORT}...`);
	// console.log("process.env: ", process.env);

	if (process.send) {
		process.send({ isBackendReady: true });

	}
});




console.log('Awaiting WebSocket connection...');

<<<<<<< HEAD
io.on('connection', socket => {
	session.start(socket);
	console.log(socket,"started connection!");
	socket.on('close', ()=>{
		console.log(webSocketServer,"socket closed!");
	})
});
// webSocketServer.close();
=======
webSocketServer.on('connection', socket => session.start(socket));
console.log('Session started');
>>>>>>> bdebf8e657345cc651829f386cd9a4678b0ea4b5

process.on('SIGTERM', () => {
	assetsServer.close(() => {
		process.exit(0);
	});
});