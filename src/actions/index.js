import axios from 'axios';
import history from './../history';
import { AUTH_ERROR, AUTH_USER, UNAUTH_USER, FETCH_MESSAGE } from './types';

const ROOT_URL = 'http://localhost:3090';

export function signupUser({ email, password }) {
	return function (dispatch) {
		axios.post(`${ROOT_URL}/signup`, { email, password })
			.then(response => {
				dispatch({ type: AUTH_USER });
				localStorage.setItem('token', response.data.token);
				history.push('/protected-resource');
			})
			.catch(error => {
				dispatch(authError(error.response.data.error));
			});
	};
};

export function signinUser({ email, password }) {
	return function (dispatch) {
		axios.post(`${ROOT_URL}/signin`, { email, password })
			.then(response => {
				dispatch({ type: AUTH_USER });
				localStorage.setItem('token', response.data.token);
				history.push('/protected-resource');
			})
			.catch(error => {
				dispatch(authError('Bad Credentials'));
			});
	};
};

export function signoutUser() {
	return function(dispatch) {
		localStorage.removeItem('token');

		return dispatch({ type: UNAUTH_USER });
	};
};

export function authError(errorMessage) {
	return {
		type: AUTH_ERROR,
		payload: errorMessage
	};
};

export function fetchMessage() {
	return function(dispatch) {
		axios.get(ROOT_URL, {
			headers: {
				Authorization: localStorage.getItem('token')
			}
		})
			.then(response => {
				dispatch({
					type: FETCH_MESSAGE,
					payload: response
				});
			});
	};
};
