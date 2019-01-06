import React, { Component } from 'react';
import styled from 'styled-components';

const LoginWrapper = styled.form`
	display: grid;
	justify-self: center;
	align-self: center;
	border: 2px solid #e2e4e1;
	background: #f1f1f1;
	grid-column: span 3;
	padding: 1em;
	border-radius: 5px;
	input {
		font-size: 16px;
		color: #323232;
		padding: 0.5em;
		border: 2px solid #e4e2e1;
		border-radius: 5px;
		transition: 0.3s ease-in-out;
	}
	input:focus {
		outline: none;
		border-color: #56e39f;
	}
	h3 {
		text-align: center;
	}
`;

const LogInButton = styled.button`
	padding: 0.5em;
	color: #fff;
	background: #56e39f;
	margin: 1em 0 0 0;
	border-radius: 5px;
	min-width: 75px;
	border: none;
	font-size: 14px;
	font-weight: 600;
	transition: 0.2s ease-in-out;
	:disabled {
		background: #7e7e7e;
	}
`;

export default class LogIn extends Component {
	constructor() {
		super();
		this.state = {
			username: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		this.setState({
			username: e.target.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.logIn(this.state.username);
		this.setState({
			username: ''
		});
	}

	render() {
		const disabled = this.state.username === '';
		return (
			<LoginWrapper onSubmit={this.handleSubmit}>
				<h3>Chatter Login</h3>
				<input
					onChange={this.handleChange}
					placeholder="Username"
					value={this.state.username}
					type="text"
				/>
				<LogInButton disabled={disabled}>Log in</LogInButton>
			</LoginWrapper>
		);
	}
}
