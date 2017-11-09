'use strict';

const CommandRunner = require('./CommandRunner');
const commandRunner = new CommandRunner();
const specialCommands = require('./specialCommands');
const server = require('./server');
const PORT = 9001;
const child_process = require('child_process');

// const WEBSOCKET_PORT = 9002;
var env = null;
const http = require('http');
const express = require('express');
const { Server } = require('ws');

const assets = express();
const assetsServer = http.createServer(assets);
const path = require('path');
const webSocketServer = new Server({ server: assetsServer });

module.exports = {
	_parseMessage(message) {
		let parsedMessage;
		console.log("_parseMessage:",message);
		console.log(message,message.length,typeof(message));
		console.log(message.slice(1,16));
		console.log(message.slice(1,16) === "sciunit exec -i");
		if (message.slice(1,16) === "sciunit exec -i")
		{

			env = process.env;
			message = 'env SHELL=./fakeshell.py sciunit exec -i'
			console.log("childprocess", env);
			parsedMessage = JSON.parse(message);
		}
		else
		{
			try {
				parsedMessage = JSON.parse(message);
				// var session_two = webSocketServer.on('connection', socket => start(socket));
				// console.log(session_two);
			} catch (e) {
				return null;
			}
		}


		return parsedMessage.command ? parsedMessage.command : null;
	},

	start(webSocket) {
		console.log('WebSocket connection established!');

		commandRunner.on('output', output => webSocket.send(JSON.stringify({ output })));
		commandRunner.on('error', error => webSocket.send(JSON.stringify({ error })));
		commandRunner.on('end', exitCode => webSocket.send(JSON.stringify({ exitCode })));

		webSocket.on('message', message => {
			const command = this._parseMessage(message);

			if (!command) {
				webSocket.send(JSON.stringify({ error: 'Invalid payload' }));
				webSocket.send(JSON.stringify({ exitCode: -1 }));
				return;
			}

			if (specialCommands[command]) {
				specialCommands[command].then(result => {
					webSocket.send(JSON.stringify(result));
				});

				return;
			}

			commandRunner.run({ command });
		});
	}
};
