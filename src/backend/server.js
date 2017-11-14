'use strict';

const PORT = 9001;
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

	if (process.send) {
		process.send({ isBackendReady: true });

	}
});

console.log('Awaiting WebSocket connection...');

webSocketServer.on('connection', socket => {
	session.start(socket);
});
// webSocketServer.close();
webSocketServer.on('close', () => {
	// BROWSER DISCONNECTED
	console.log("socket closed!");
});

console.log('Session started');

process.on('SIGTERM', () => {
	assetsServer.close(() => {
		process.exit(0);
	});
});