module.exports = function ActiveButtonClickReducer(state="",action) {
	switch (action.type){
		case 'COMMAND_BUTTON':
			state = action.payload;
			return state;
	}
	return state;

};
