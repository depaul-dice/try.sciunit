'use strict';

const EventEmitter = require('events');
const spawn = require('child_process').spawn;
var tmp_PjtName = "";

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

	childProcess.stdout.on('data', data => {
		this.emit('output', data.toString());
		console.log(data.toString().trim());
		var output = data.toString().trim();
		if (args[2] === "copy"){
			console.log("it is copy");
		}
		if (commandName == "sciunit" && args[2] == "create")
		{
			console.log("hello after run the command!",command);
			tmp_PjtName = args[1];
			// console.log(tmp_PjtName);
		}
		// console.log(process.cwd());
		// var current_directory = "/home/ubuntu/try.sciunit_10262017/test_cwd";
		if (commandName == "sciunit" && args[2] == "copy"){
			console.log('Starting directory: ' + process.cwd());
			try {
				console.log(tmp_PjtName);
				var new_dir_nm = tmp_PjtName.slice(5,10);
				shell.rm('-rf', tmp_PjtName);
				shell.mkdir(new_dir_nm);
				process.chdir(new_dir_nm+'/');
				console.log('New directory: ' + process.cwd());
			}
			catch (err) {
				console.log('chdir: ' + err);
			}
		}
	});
	childProcess.stderr.on('data', error => this.emit('error', error.toString()));
	childProcess.on('close', exitCode => this.emit('end', exitCode.toString()));

};

module.exports = CommandRunner;