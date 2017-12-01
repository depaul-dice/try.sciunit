'use strict';
const React = require('react');
var ReactRouter = require('react-router');
var autofocus = true;
var parse = require('shell-quote').parse;
var ReactCSSTransitionGroup = require('react-addons-css-transition-group'); // ES5

var cmd_id = 0;
var switch_detail_byID;
var progress_bar_percentage = "15%";
var copy_token = "";
var copy_token_flag = false;
var clicked_button_cmd = "";
var session_number="1";
var btn_blink_style = null;
btn_blink_style ={margin: "-11px", paddingLeft:"70px",fontFamily:"Lato",color:"Black"};

var switch_detail;

function App(props) {
	let textInput = null;
	let button_ref = null;
	let menu_ref = null;
	let detail_ref = null;
	// console.log(props);
	var output_fromSciunit=['sciunit create Project1'];
	const { output, runCommand,cmd_detail,clickedButton} = props;
	const {menu_selection,cmd_id_M} = props;
	// console.log(typeof(cmd_id_M),cmd_id_M);
	// cmd_id = cmd_id_M;

	function if_button_exist() {
		if (cmd_detail[cmd_id].cmd_button != "")
		{
			return 	<button type="button" style={{fontFamily:"Consolas"}} value={cmd_detail[cmd_id].cmd_button+copy_token} className="button-one"  ref={(input) => { button_ref = input; }} onMouseDown={handleMouseDown} onMouseUp={handlefoucs()}>{cmd_detail[cmd_id].cmd_button}{copy_token}</button>
		}
	};

	const outputChildren = output.map(o => {
		var user_input_command = parse(o.value);
		// console.log(o.value.slice(8,12));
		// console.log(o.value.slice(8,12) == 'copy');
		// console.log(o.value.length);
		if(o.value.slice(8,12) == 'copy')
		{
			copy_token_flag = true;
			session_number="2";
			btn_blink_style ={
				margin: "-11px",
				color:"red",
				paddingLeft:"70px",
				fontFamily:"Lato",
				animationDuration: "1200ms",
				animationName: "blink",
				animationDirection: "alternate",
				webkitAnimation: "blink 1200ms",

			}
			copy_token = "";
			return <li key={o.id} className="output__item"><pre style={{fontFamily:"Ubuntu Mono"}}>> {o.value}</pre></li>
		}

		if (o.value.slice(8,15) == 'exec -i'){
			copy_token = "";
			return <li key={o.id} className="output__item"><pre style={{fontFamily:"Ubuntu Mono"}}>{o.value}</pre></li>
		}

		if ((o.value.slice(0,7) === 'sciunit' || o.value.slice(0,2) === 'ls' || o.value.slice(0,3) === 'man' ) && user_input_command.length < 5){
			copy_token = "";
			return <li key={o.id} className="output__item"><pre style={{fontFamily:"Ubuntu Mono"}}>> {o.value}</pre></li>
		}

		else if (o.value.length == 8){
			copy_token = o.value;
			// console.log(copy_token);
			return <li key={o.id} className="output__item"><pre style={{fontFamily:"Ubuntu Mono"}}> {o.value}</pre></li>
		}
		else if (o.value.slice(8,12) == 'open')
		{
			// console.log("hello from open");
			return <li key={o.id} className="output__item"><pre style={{fontFamily:"Ubuntu Mono"}}> {o.value}</pre></li>
		}
		else {
			// console.log(o.value);
			return <li key={o.id} className="output__item"><pre style={{fontFamily:"Ubuntu Mono"}}> {o.value}</pre></li>
		}
	});
	var user_input_command;
	var command_key = ['Create','Exec','Show','Repeat','List','Copy','Open'];
	var length_of_cmd_detail = cmd_detail.length;
	var command_list_restrict = ['ls','man sciunit','sciunit --help'];
	// console.log(length_of_cmd_detail);
	// console.log("initial id:",cmd_id);


	for (var i = 0;i<length_of_cmd_detail; i++){
		command_list_restrict.push(cmd_detail[i].cmd_button);
	}

	// function printInbuttonTerm(){
	// 	props.buttonValue[0] = cmd_detail[cmd_id].cmd_button;
	// 	return props.buttonValue[0];
	// 	// console.log(e.target.getAttribute('value'));
	// 	// e.target.value = props.buttonValue[0];
	// };

	// var buttonReturn = printInbuttonTerm();
	const getinput = (e) => {
		if (e.keyCode == 13){
			// console.log("GET INPUT", e.target.value);
			user_input_command = e.target.value;
		}

	};
	const nextStep = (e) => {
		// console.log(user_input_command);
		// console.log(cmd_id);
		// console.log(,button_ref.value.trim(" "),user_input_command.trim(" "),("sicunit open "+copy_token).trim(" "),user_input_command === button_ref.value, user_input_command === "sicunit open "+copy_token);

		// console.log(user_input_command.slice(0,13),user_input_command.slice(0,13).length);
		// console.log(user_input_command.trim(" ").slice(0,12)==="sciunit open");
		if (e.key === 'Enter'&& user_input_command.trim(" ").slice(0,12)==="sciunit open"){
			progress_bar_percentage = "100%";
			cmd_id += 1;
		}
		else if (e.key === 'Enter' &&  user_input_command == button_ref.value && command_list_restrict.includes(user_input_command)) {
			if (cmd_id < length_of_cmd_detail - 1) {
				cmd_id += 1;
				if (cmd_id == length_of_cmd_detail - 1) {
					progress_bar_percentage = "100%";
				}
				else {
					var percen = parseInt(progress_bar_percentage.slice(0, 2));
					percen = percen + 10;
					progress_bar_percentage = percen.toString() + "%";
					// console.log(progress_bar_percentage);
				}
				// console.log('cmd_id', cmd_id);
			}
		}


	};

	function handlefoucs() {
		// console.log("hello from handle foucs");
		textInput.focus();
	};

	function handleMouseDown() {
		// console.log("hello from handleMouseDown");
		textInput.value = button_ref.value;
	};

	function handleMouseDown_menu(e) {

		detail_ref.value = parseInt(e.target.getAttribute('value'));
		// console.log(detail_ref.value);
		cmd_id = detail_ref.value;
		// switch_detail = e.target.getAttribute('value');
		// console.log(switch_detail);
		// console.log(switch_detail === 'Create',switch_detail === 'Exec')
        //
		// if (switch_detail === 'Create'){
		// 	cmd_id = 0;
		// 	console.log("YES");
        //
		// }
		// else if (switch_detail === 'Exec'){
		// 	cmd_id = 1;
		// }
		// console.log(cmd_id);

		// console.log("hello from handleMouseDown");
		// switch_detail = menu_ref.value;
		// console.log(menu_ref.value);
		// console.log(switch_detail);
		// for (var i = 0;i<length_of_cmd_detail; i++){
		// 	if (switch_detail == command_key[i]){
		// 		switch_detail_byID = i;
		// 	}
		// }
        //
		// console.log(switch_detail_byID);
		// cmd_id = switch_detail_byID;
		// // console.log(cmd_detail[cmd_id]);
		// console.log("the globale in switch after ", cmd_id);

	};
	// console.log("the globale", cmd_id);
	// const switchDetail = (e) => {
	// 	// console.log("the globale in switch", cmd_id);
	// 	// switch_detail = e.target.getAttribute('value');
	// 	// console.log(switch_detail);
	// 	// for (var i = 0;i<length_of_cmd_detail; i++){
	// 	// 	if (switch_detail == command_key[i]){
	// 	// 		switch_detail_byID = i;
	// 	// 	}
	// 	// }
	// 	// console.log(switch_detail_byID);
	// 	// cmd_id = switch_detail_byID;
	// 	// // console.log(cmd_detail[cmd_id]);
	// 	// console.log("the globale in switch after ", cmd_id);
	// };
	return (
		<div>
			<div className="content-body">
				<div id="codeschool">
					<div className="inner">

						<ol className="progress-bar">
							<li>
								<img src="https://sciunit.run/static/assets/images/new_GeoTrust.png" height="30" width="40" alt=""/>
							</li>
							<li>
								{/*<a value="Create" onClick={switchDetail} >*/}
									{/*Create*/}

								{/*</a>*/}
								<a value="0" onMouseDown={menu_selection}>Create</a>
							</li>
							<li>
								<a value="1" onMouseDown={menu_selection}>Exec</a>
							</li>

							<li>
								<a value="Show">Show</a>
							</li>

							<li>
								<a value="Repeat">Repeat</a>
							</li>

							<li>
								<a value="List">List</a>
							</li>

							<li>
								<a value="Copy">Copy</a>
							</li>

							<li>
								<a value="Open">Open</a>
							</li>

							{/*<li>*/}
							{/*<a href="#">Rm</a>*/}
							{/*</li>*/}
						</ol>
					</div>
					<div className="meter">
						<span style={{width:progress_bar_percentage}}></span>
					</div>
				</div>


				<div className="commandDetail" value={cmd_id} ref={(input) => { detail_ref = input; }}>
					{/*<h1>The global{cmd_id}</h1>*/}
					<h1>{cmd_detail[cmd_id].title}</h1>
					<hr/>
					<div>
						<span style={{fontFamily:"Consolas", fontWeight:"bold"}}>{cmd_detail[cmd_id].sciunit_1}</span>{cmd_detail[cmd_id].description_1}<span style={{fontFamily:"Inconsolata"}}>{cmd_detail[cmd_id].sciunit_1_1}</span> <br/>
						{cmd_detail[cmd_id].description} <br/>
						{cmd_detail[cmd_id].description_2_1}<span style={{fontFamily:"Inconsolata"}}>{cmd_detail[cmd_id].sciunit_2}</span>{cmd_detail[cmd_id].description_2}<span style={{fontFamily:"Consolas"}}>{cmd_detail[cmd_id].sciunit_2_1}</span> <br/>
						{cmd_detail[cmd_id].description} <br/>
						{cmd_detail[cmd_id].description_3}<span style={{fontFamily:"Consolas"}}>{cmd_detail[cmd_id].sciunit_3}</span>{cmd_detail[cmd_id].description_3_1}<span style={{fontFamily:"Consolas"}}>{cmd_detail[cmd_id].sciunit_4}</span>{cmd_detail[cmd_id].description_3_2} <br/>
					</div>
					{if_button_exist()}
				</div>
				<div className="fakeMenu">
					<div className="fakeButtons fakeClose"></div>
					<div className="fakeButtons fakeMinimize"></div>
					<div className="fakeButtons fakeZoom"></div>
					<div style={btn_blink_style}>
						Ubuntu16.04 @machine{session_number}
					</div>
				</div>
				<div className="fakeScreen" onClick={handlefoucs}>
					<div className="scroll-box">
						Press enter to submit commands
						<ul className="terminal--output">{outputChildren}</ul>
						><input className="terminal__input" type="text" ref={(input) => { textInput = input; }} onKeyUp={runCommand} onKeyPress={nextStep} onKeyDown={getinput}/>
					</div>
				</div>
			</div>
			<footer class="footer">
				<a href="https://sciunit.run/" style={{fontSize: "22px", paddingLeft:"20px"}}>Sciunit Home</a>		<a href="https://sciunit.run/docs/" style={{fontSize: "22px", paddingLeft:"20px"}}>Documentaion</a><br/>
				The Sciunit is supported by the National Science Foundation under grants ICER-1639759,<br/>
					ICER-1661918, ICER-1440327, and ICER-1343816, and by Bloomberg Philanthropies (a UChicago subcontract).
			</footer>
		</div>
	);
};
module.exports = App;