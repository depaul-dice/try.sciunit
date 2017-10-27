'use strict';

const { combineReducers } = require('redux');
const commands = require('./commands');
const commandDetailReducer = require('./commandDetail');
const button_value_input = require('./button_input');

module.exports = combineReducers({
	commands,
	commandDetailReducer,
	button_value_input
});