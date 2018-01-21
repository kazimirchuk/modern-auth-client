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

class Signin extends Component {
	signIn({ email, password }) {
		this.props.signinUser({ email, password });
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
			<form onSubmit={handleSubmit(this.signIn.bind(this))}>
				<fieldset className="form-group">
					<label>Email:</label>
					<Field name="email" component={renderInput} type="text" />
				</fieldset>
				<fieldset className="form-group">
					<label>Password:</label>
					<Field name="password" component={renderInput} type="password" />
				</fieldset>
				{this.renderAlert()}
				<button action="submit" className="btn btn-primary">Sign in</button>
			</form>
		);
	}
}

function mapStateToProps(state) {
	return { errorMessage: state.auth.errorMessage };
}

Signin = connect(mapStateToProps, actions)(Signin);

export default reduxForm({
	form: 'signin',
	fields: ['email', 'password']
})(Signin);
