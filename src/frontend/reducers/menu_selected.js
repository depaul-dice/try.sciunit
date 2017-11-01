module.exports = function menu_clicked(state=0,action) {
	switch (action.type){
		case 'MENU_SELECTED':
			state = action.payload;
			return state;
	}
	// state = "";
	return state;

};
