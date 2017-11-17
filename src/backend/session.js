'use strict';

const CommandRunner = require('./CommandRunner');
const commandRunner = new CommandRunner();
const specialCommands = require('./specialCommands');
const server = require('./server');
var shell = require('shelljs');



module.exports = {
	_parseMessage(message) {
		let parsedMessage;
		// console.log("_parseMessage:",message);
		// console.log(message,message.length,typeof(message));
		// console.log(message.slice(1,16));
		// console.log(message.slice(1,16) === "sciunit exec -i");
		// if (message.slice(1,16) === "sciunit exec -i")
		// {
        //
		// 	// env = process.env;
		// 	// message = 'env SHELL=./fakeshell.py sciunit exec -i';
		// 	// console.log("childprocess", env);
		// 	parsedMessage = JSON.parse(message);
		// }
		// else
		// {
		 	try {
				parsedMessage = JSON.parse(message);
				// console.log(parsedMessage);
				 // var session_two = webSocketServer.on('connection', socket => start(socket));
				 // console.log(session_two);
			} catch (e) {
				return null;
			}
		// }
		// console.log(parsedMessage);
		// console.log(parsedMessage.command);
		return parsedMessage.command ? parsedMessage.command : null;
	},

	start(webSocket) {
		console.log('WebSocket connection established!');

		commandRunner.on('output', output => webSocket.send(JSON.stringify({ output })));
		commandRunner.on('error', error => webSocket.send(JSON.stringify({ error })));
		commandRunner.on('end', exitCode => webSocket.send(JSON.stringify({ exitCode })));

		webSocket.on('message', message => {
			const command = this._parseMessage(message);
			// console.log("hello from start():",message);
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
