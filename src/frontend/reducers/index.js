'use strict';

const { combineReducers } = require('redux');
const commands = require('./commands');
const commandDetailReducer = require('./commandDetail');

module.exports = combineReducers({
	commands,
	commandDetailReducer
});