// import React from "react";
// import selectCommand
// // import $ from "jquery";
// export const CommandDetail = (props) => {
//
// 	var detail_list = [["1.1 Creating a sciunit workspace","This create commands create and opens an empty sciunit, where ~/sciunit/Project1 is its workspace.Run this command or click the button to see next where teaches you how to verify if you had created the workspace.","sciunit create Project1"],
// 						["1.2 Showing a sciunit workspace", "sciunit show displays information about the last captured execution in your sciunit.  If there is no execution captured, it reminds you the name of your current sciunit.","sciunit show"],
// 						["1.3 sciunit exec ./hello.s", "Sciunit exec captures an execution of your program. Here the sample program is hello.sh. Create a container by issuing the command  sciunit exec ./hello.sh. Use sciunit show command to display the details of the last captured execution. You will see e1 <show the result here", "sciunit exec ./hello.sh"]
// 					   ];
//
// 	var command_clicked = props.command_clicked;
// 	// var present;
// 	// $
// 	function MyFunction() {
// 		return
// 	}
//
// 	// if (command_clicked == 'create') {
// 	// 	present = "";
// 	// }
// 	// else if (command_clicked == 'Create!!!!!!!')
// 	// {
// 	// 	present = command_clicked;
// 	// }
// 	// else
// 	// {
// 	// 	present = "somethingelse";
// 	// }
//
//
// 	return(
// 		<div>
//
// 			<div id="codeschool">
// 				<div className="inner">
//
// 					<ol className="progress-bar">
// 						<li>
// 							<img src="https://sciunit.run/static/assets/images/new_GeoTrust.png" height="30" width="40" alt=""/>
// 						</li>
// 						<li>
// 							<a href="#" onClick={MyFunction}>Create</a>
// 						</li>
// 						<li>
// 							<a href="#">Copy</a>
// 						</li>
//
// 						<li>
// 							<a href="#">Open</a>
// 						</li>
//
// 						<li>
// 							<a href="#">Exec</a>
// 						</li>
//
// 						<li>
// 							<a href="#">Show</a>
// 						</li>
//
// 						<li>
// 							<a href="#">Repeat</a>
// 						</li>
//
// 						<li>
// 							<a href="#">List</a>
// 						</li>
//
// 						<li>
// 							<a href="#">Rm</a>
// 						</li>
// 					</ol>
// 				</div>
// 			</div>
//
// 			<div className="commandDetail" >
// 				<h1></h1>
// 				<h1>{detail_list[0][0]}</h1>
// 				<div>
// 					{detail_list[0][1]}
// 				</div>
// 				<button type="button" className="button-one"  btn-defaultvalue="sciunit init">{detail_list[0][2]}</button>
// 			</div>
//
// 		</div>
//
// 	);
//
// };