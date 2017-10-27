'use strict';

const App = require('../components/App/index.jsx');
const { connect } = require('react-redux');
const commandsActions = require('../actions/commandsActions');
const clickedButton = require('../actions/clickedButton');

function mapStateToProps(state) {
	return {
		output: state.commands,
		cmd_detail: state.commandDetailReducer,
		buttonValue: state.button_value_input
	};
}

function mapDispatchToProps(dispatch) {
	return {
		runCommand(e) {
			if (e.key !== 'Enter') {
				return;
			}
			dispatch(commandsActions.runCommand(e.target.value));
			e.target.value = '';
		},
		clickedButton(e){
			dispatch(clickedButton.clickedButton(e.target.value));
		}
	};
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(App);