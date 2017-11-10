'use strict';

var child_process = require('child_process').spawn;
var random_number_generator = require('./make_random_number');
const EventEmitter = require('events');
var parse = require('shell-quote').parse;
const spawn = require('child_process').spawn;

var workspace_relocate_path = [];

function CommandClient() {
	var loc = window.location, new_uri;
	if (loc.protocol === "https:"){
		new_uri = "wss:";
	}
	else
	{
		new_uri = "ws:";
	}
	new_uri += "//" + loc.host;
	new_uri += loc.pathname;
	// console.log(new_uri);
	this.webSocket = new WebSocket(new_uri);
	this.webSocket.onmessage = message => this.onMessage(JSON.parse(message.data));
}

CommandClient.prototype = Object.create(EventEmitter.prototype);

CommandClient.prototype.begin = function begin(command) {
	if (this.webSocket.readyState === WebSocket.CONNECTING) {
		this.webSocket.onopen = () => {
			try{
				this.webSocket.send(JSON.stringify({ command }),function(error){

				});
			}
			catch (err){
				console.log(err);
			}

		}
	}
	var workspace_name = "";
	// console.log("global var:",workspace_relocate_path);
	// console.log("Command is : " + command);
	var command_lst = parse(command);
	// console.log(typeof(command_lst[command_lst.length-1]));
	// console.log(command_lst.length);

	// console.log(command_lst[2].slice(0, 2));
	// if (command_lst[0] == 'sciunit' && command_lst.length == 1)
	// {
	// 	console.log("ONLY SCIUNIT")
	// 	this.webSocket.send(JSON.stringify({ command }));
	// }
	if (command_lst[0] == 'sciunit' && (command_lst[1] == ''|| '--version' || '--help' || 'exec' || 'create'|| 'list' || 'show' || 'copy' || 'open' || 'rm' || 'repeat')){
			if (command_lst.length > 2 && command_lst[1] == 'exec')
			{
				if( command_lst[2].slice(0, 2) == './' )
				{
					var code = workspace_relocate_path[0];	// TODO: Loop through the array?
					command = "sciunit --root /tmp/"+code+" "+command_lst[1]+ " "+command_lst[2];
					// console.log(command);
					try
					{
						this.webSocket.send(JSON.stringify({ command }),function(error){

						});
					}
					catch (err){
						console.log(err);
					}
				}
				else if (command_lst[2].slice(0, 2) == '-i')
				{
					console.log("--i -i!!!");
					command = "env SHELL=./fakeshell.py sciunit exec -i";
					try{
						this.webSocket.send(JSON.stringify({ command }),function(error){

						});
					}
					catch (err){
						console.log(err);
					}
				}
				else
				{
					this.webSocket.send(JSON.stringify("ERROR"),function(error){

					});
				}
			}
			else if(command_lst.length > 2 && command_lst[1] == 'create')
			{
				var project_name = command_lst[2];
				workspace_name = " create " + command_lst[2];
				var code = random_number_generator.makeid(workspace_name);

				// var name_code_pair = {"command_lst[2]":code};

				var random_num_command = "sciunit --root /tmp/"+code+workspace_name;
				workspace_relocate_path.push(code);
				// console.log(workspace_relocate_path);
				// console.log(random_num_command);
				command = random_num_command;
				// console.log(command);
				try{
					this.webSocket.send(JSON.stringify({ command }),function(error){

					});
				}
				catch (err){
					console.log(err);
				}

			}
			else if (command_lst[1] == 'show' || 'open' || 'list' || 'copy' || 'repeat')
			{
				var code = workspace_relocate_path[0];	// TODO: Loop through the array?
				if (command_lst.length > 2 && typeof(command_lst[command_lst.length-1]) == 'object'){
					// console.log( typeof(command_lst[command_lst.length-1]),command_lst[command_lst.length-1].comment);
					if (command_lst[command_lst.length-1].comment == ''){
						command = "sciunit --root /tmp/"+code+" "+command_lst[1]+ " "+command_lst[2]+"#";
					}
				}
				else if (command_lst.length > 2){
					command = "sciunit --root /tmp/"+code+" "+command_lst[1]+ " "+command_lst[2];
				}
				else {
					command = "sciunit --root /tmp/"+code+" "+command_lst[1];
				}
				// console.log(command);
				try{
					this.webSocket.send(JSON.stringify({ command }),function(error){

					});
				}
				catch (err){
					console.log(err);
				}


			}
			else if (command_lst[1] != 'exec' && 'create' && 'show'&&'open'&&'list'&&'copy'&&'repeat')	//TODO
			{
				// console.log('anything but exec');
				// console.log(command);
				try{
					this.webSocket.send(JSON.stringify({ command }),function(error){

					});
				}
				catch (err){
					console.log(err);
				}
			}

	}
	// else if (command_lst[0] == 'ls' && command_lst.length == 1){
	// 	this.webSocket.send(JSON.stringify({ command }));
	// }
	else if (command_lst[0] == 'man' && command_lst.length == 2 && command_lst[1] == 'sciunit'){
		try{
			this.webSocket.send(JSON.stringify({ command }),function(error){

			});
		}
		catch (err){
			console.log(err);
		}
	}


	// if (command != 'ls' && (command.substring(0, 7) != 'sciunit') && (command.substring(0,4) != 'man')){
	// 	console.log(command.slice(0, 7));
	// 	console.log("NOT SCIUNIT OR LS");
	// 	console.log(JSON.stringify({ command }));
	// 	this.webSocket.send(JSON.stringify("NOT VALID INPUT"));
	// }
};

CommandClient.prototype.onMessage = function onMessage(message) {

	switch (Object.keys(message)[0]) {
		case 'output':
			this.emit('output', message.output);
			break;

		case 'error':
			this.emit('error', message.error);
			break;

		case 'currentDirectory':
			this.emit('currentDirectory', message.currentDirectory);

		case 'exitCode':
			this.emit('exitCode', message.exitCode);

			this.removeAllListeners('output');
			this.removeAllListeners('error');
			this.removeAllListeners('exitCode');
			this.removeAllListeners('currentDirectory');

			break;

		default:
			this.emit('error', 'unrecognised message type');
	}
};

module.exports = new CommandClient();
