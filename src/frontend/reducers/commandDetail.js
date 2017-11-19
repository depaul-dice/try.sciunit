module.exports = function commandDetailReducer() {
	return [
		{
			id: 1,
			key:"Create",
			title: "Creating An Empty Sciunit",
			description: "",

			sciunit_1:"sciunit create ",
			description_1: "creates and opens an empty sciunit.",
			sciunit_1_1:"",

			description_2_1:"",
			sciunit_2:"",
			description_2:"Click the button to paste the command into the shell, and press Enter to run the command and create your first sciunit.",
			sciunit_2_1:"",

			description_3:"",
			sciunit_3:"",
			sciunit_3_1:"",
			description_3_1:"",
			sciunit_4:"",
			description_3_2:"",

			cmd_button: "sciunit create Project1"

		},
		{
			id: 2,
			key:"Exec",
			title: "Capturing Executions",
			description: "",

			sciunit_1:"sciunit exec ",
			description_1: "captures an execution of your program. ",
			sciunit_1_1:"",

			description_2_1:"Use ",
			sciunit_2:" cat hello.sh ",
			description_2: "to display its content. Run the command in the button to capture its execution.",
			sciunit_2_1:"",

			description_3: "The execution is then encapsulated as ",
			sciunit_3:" e1 ",
			sciunit_3_1:"",
			description_3_1:"in the ",
			sciunit_4:" Project1 ",
			description_3_2:"sciunit.",

			cmd_button: "sciunit exec ./hello.sh"
		},
		{
			id: 3,
			key:"Show",
			title: " Displaying Last Execution",
			description: "",

			sciunit_1:"",
			description_1: "Shows last captured execution in the current sciunit.",
			sciunit_1_1:"",

			description_2_1:"Here the current sciunit is ",
			sciunit_2:" Project1 ",
			description_2:"and the last captured execution is ",
			sciunit_2_1:" e1.",

			description_3:"",
			sciunit_3:"",
			sciunit_3_1:"",
			description_3_1:"",
			sciunit_4:"",
			description_3_2:"",

			cmd_button: "sciunit show"
		},
		{
			id: 4,
			key:"Repeat",
			title: " Repeating Executions",
			description: "",

			sciunit_1:"sciunit repeat ",
			description_1: "will repeat a previously captured execution.",
			sciunit_1_1:"",


			description_2_1:"Let’s repeat ",
			sciunit_2:" ./hello.sh ",
			description_2:"which is captured previously in ",
			sciunit_2_1:" e1.",

			description_3:"",
			sciunit_3:"",
			sciunit_3_1:"",
			description_3_1:"",
			sciunit_4:"",
			description_3_2:"",


			cmd_button: "sciunit repeat e1"
		},
		// {
		// 	id: 5,
		// 	title: "Capture-as-you-go",
		// 	description: "",
		// 	description_1: "sciunit exec -i provides a different way to capture an execution - capture as you type commands on the shell.",
        //
		// 	description_2:"The execution of all commands that you enter and run on the shell will be captured.",
        //
		// 	description_3: "Run echo and ./hello.sh",
        //
		// 	cmd_button: "sciunit exec -i"
		// },
		{
			id: 5,
			key:"List",
			title: "Listing All Executions",
			description: "",
			description_1: "List all executions within the current sciunit:",
			description_2: "Use sciunit list.",

			cmd_button: "sciunit list"
		},
		{
			id: 6,
			key:"Copy",
			title: "Copying Sciunit to Another Machine",
			description: "",
			description_1: "sciunit copy copies the current sciunit to the cloud and gives you a token. You can use the token for accessing the sciunit on another machine. See next slide for using this token in sciunit open. ",

			description_2:"The sciunit lives on the cloud for a day if you have not accessed it.",

			description_3:"Note: After executing sciunit copy, the tutorial will take you to another machine, so that you can open your sciunit there. The tutorial continues on that machine as well.",

			cmd_button: "sciunit copy"
		},
		{
			id: 7,
			key:"Open",
			title: "Open an Existing Sciunit",
			description: "",
			description_1: "Click the button and press Enter to access the sciunit we just copied to the cloud.",

			description_2:"sciunit open can also be used for switching between other sciunits located on your local machine.",

			cmd_button: "sciunit open "
		},
		{
			id: 8,
			key:"End",
			title: "End of the Tutorial",
			description: "",
			description_1: "You have reached the end of the tutorial",
			description_2:"",

			cmd_button: ""
		}
	]
}