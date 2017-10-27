export const selectCommand = (cmd) => {
    console.log("You clicked on cmd: ", cmd);
    return{
        type: "COMMAND_SELECTED",
        payload: cmd
    }
};