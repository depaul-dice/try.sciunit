'use strict';

const EventEmitter = require('events');
const spawn = require('child_process').spawn;
const child_process = require('child_process');


function CommandRunner() {
	this.shell = false;
}

CommandRunner.prototype = Object.create(EventEmitter.prototype);

CommandRunner.prototype._parseCommand = function parseCommand(command) {
	const commandParts = command.split(' ');
	const commandName = commandParts[0];
	const args = commandParts.slice(1, commandParts.length);

	return { commandName, args };
};

CommandRunner.prototype.run = function run({ command, _spawn = spawn }) {
	const { commandName, args } = this._parseCommand(command);

	const childProcess = _spawn(commandName, args, {
		shell: this.shell
	});

	// console.log(commandName,args);
	// console.log(process.cwd());
	// var current_directory = "/home/ubuntu/try.sciunit_10262017/test_cwd";

	console.log('Starting directory: ' + process.cwd());
	try {
		process.chdir('/test_cwd');
		console.log('New directory: ' + process.cwd());
	}
	catch (err) {
		console.log('chdir: ' + err);
	}
	// console.log("child_process.env",process.env);

	childProcess.stdout.on('data', data => this.emit('output', data.toString()));
	childProcess.stderr.on('data', error => this.emit('error', error.toString()));
	childProcess.on('close', exitCode => this.emit('end', exitCode.toString()));

};

module.exports = CommandRunner;