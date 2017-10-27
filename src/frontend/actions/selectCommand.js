export const selectCommand = (cmd) => {
    console.log("You clicked on user: ", cmd);
    return{
        type: "COMMAND_SELECTED",
        payload: cmd
    }
};