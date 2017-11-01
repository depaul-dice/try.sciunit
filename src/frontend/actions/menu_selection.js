export const menu_selection = (cmd_detail_id) => {
	console.log("You clicked on button: ", cmd_detail_id);
	return{
		type: "MENU_SELECTED",
		payload: cmd_detail_id
	}
};
