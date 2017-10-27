'use strict';

const { combineReducers } = require('redux');
const commands = require('./commands');
const commandDetailReducer = require('./commandDetail');
const ActiveButtonClickReducer = require('./button_clicked');

module.exports = combineReducers({
	commands,
	commandDetailReducer,
	ActiveButtonClickReducer
});