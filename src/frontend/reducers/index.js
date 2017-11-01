'use strict';

const { combineReducers } = require('redux');
const commands = require('./commands');
const commandDetailReducer = require('./commandDetail');
const ActiveButtonClickReducer = require('./button_clicked');
const menu_clicked = require('./menu_selected');

module.exports = combineReducers({
	commands,
	commandDetailReducer,
	ActiveButtonClickReducer,
	menu_clicked
});