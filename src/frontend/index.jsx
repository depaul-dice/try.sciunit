'use strict';
const React = require('react');
const ReactDOM = require('react-dom');
const { Provider } = require('react-redux');
const AppContainer = require('./containers/AppContainer');
const getStore = require('./getStore');
const store = getStore();
const { getInitialAppState } = require('./actions/appActions');
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {CommandDetail} from './components/App/CommandDetail';
import {App} from './components/App/index.jsx';
const appTarget = document.querySelector('#app');

ReactDOM.render(
	<Provider store={store}>
		<AppContainer>
			<Router>
				<Route path="/" handler={App}>
					<Route path="init" handler={CommandDetail} />
				</Route>
			</Router>
		</AppContainer>
	</Provider>,

	appTarget
);

appTarget.querySelector('.terminal__input').focus();

