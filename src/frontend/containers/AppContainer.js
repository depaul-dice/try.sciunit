'use strict';

const App = require('../components/App/index.jsx');
const { connect } = require('react-redux');
const commandsActions = require('../actions/commandsActions');
const clickedButton = require('../actions/clickedButton');
const menu_selection = require('../actions/menu_selection');

function mapStateToProps(state) {
	return {
		output: state.commands,
		cmd_detail: state.commandDetailReducer,
		button: state.ActiveButtonClickReducer,
		cmd_id_M:state.menu_clicked
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
		},
		menu_selection(ID){
			dispatch(menu_selection.menu_selection(ID));
		}
	};
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(App);