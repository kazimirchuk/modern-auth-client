import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import history from './history';
import {
	Router,
	Route,
	Switch
} from 'react-router-dom';
import reduxThunk from 'redux-thunk';

import Header from './components/header';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import ProtectedResource from './components/auth/protected_resource';
import Welcome from './components/welcome';
import RequireAuth from './components/auth/require_auth';
import reducers from './reducers';

import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem('token');

if (token) {
	store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<div>
				<Header />
				<Route exact path="/" component={Welcome} />
				<Route path="/signin" component={Signin} />
				<Route path="/signout" component={Signout}/>
				<Route path="/signup" component={Signup}/>
				<Route path="/protected-resource" component={RequireAuth(ProtectedResource)}/>
			</div>
		</Router>
	</Provider>, document.querySelector('.container')
);
