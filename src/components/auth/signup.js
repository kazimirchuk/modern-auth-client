import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from './../../actions';

const renderInput = field => {
	return (
		<div>
			<input className="form-control" {...field.input} type={field.type} />
			{field.meta.touched && field.meta.error &&
				<span className="error">{field.meta.error}</span>
			}
		</div>
	);
};

class Signup extends Component {
	signUp({ email, password }) {
		this.props.signupUser({ email, password });
	}

	renderAlert() {
		const { errorMessage } = this.props;

		if (errorMessage) {
			return (
				<div className="alert alert-danger">
					<strong>Oops!</strong> {errorMessage}
				</div>
			);
		}
	}

	render() {
		const { handleSubmit } = this.props;

		return (
			<form onSubmit={handleSubmit(this.signUp.bind(this))}>
				<fieldset className="form-group">
					<label>Email:</label>
					<Field name="email" component={renderInput} type="text" />
				</fieldset>
				<fieldset className="form-group">
					<label>Password:</label>
					<Field name="password" component={renderInput} type="password" />
				</fieldset>
				<fieldset className="form-group">
					<label>Confirm Password:</label>
					<Field name="passwordConfirm" component={renderInput} type="password" />
				</fieldset>
				{this.renderAlert()}
				<button action="submit" className="btn btn-primary">Sign up</button>
			</form>
		);
	}
}

function mapStateToProps(state) {
	return { errorMessage: state.auth.errorMessage };
}

Signup = connect(mapStateToProps, actions)(Signup);

function validate({ password, passwordConfirm, email }) {
	const errors = {};

	if (!email) {
		errors.email = 'Please enter an email';
	}

	if (!password) {
		errors.password = 'Please enter a password';
	}

	if (!passwordConfirm) {
		errors.passwordConfirm = 'Please enter a password confirmation';
	}

	if (password !== passwordConfirm) {
		errors.password = 'Passwords must match';
	}

	return errors;
}

export default reduxForm({
	form: 'signup',
	fields: ['email', 'password', 'passwordConfirm'],
	validate
})(Signup);
