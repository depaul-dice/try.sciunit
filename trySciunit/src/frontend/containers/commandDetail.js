'use strict';

const commandDetail = require('../components/App/CommandDetail');
const { connect } = require('react-redux');
const selectCommand = require('../actions/selectCommand');


function mapStateToProps(state) {
	return {
		output: state.commands
	};
}

function mapDispatchToProps(dispatch) {
	return {
		runCommand(e) {
			if (e.key !== 'Enter') return;

			dispatch(selectCommand.runCommand(e.target.value));
			e.target.value = '';
		}
	};
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(commandDetail);
