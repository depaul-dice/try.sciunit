/*
Action Creator
 */
export const clickedButton = (cmd) => {
    // console.log("You clicked on button: ", cmd);
    return{
        type: "COMMAND_BUTTON",
        payload: cmd
    }
};

