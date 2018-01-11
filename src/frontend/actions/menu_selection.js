export const menu_selection = (cmd_detail_id) => {
	// console.log("You clicked on button: ", cmd_detail_id.target.getAttribute('value'));
	return{
		type: "MENU_SELECTED",
		payload: parseInt(cmd_detail_id.target.getAttribute('value'))
	}
};
