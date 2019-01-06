import React, { Component } from 'react';
import styled from 'styled-components';

const FormWrapper = styled.form`
	padding: 1em;
	background: #f1f1f1;
	min-height: 50px;
	display: grid;
	grid-row: 3;
	grid-column: 2;
	grid-template-columns: 1fr auto;
	z-index: 2;
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
`;

const CTAbtn = styled.button`
	padding: 0.5em;
	color: #fff;
	background: #56e39f;
	margin: 0 0.5em;
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

export default class MessageForm extends Component {
	// Set up state to contain our messaage.
	constructor() {
		super();
		this.state = {
			message: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	// setState of our message on our input.
	handleChange(e) {
		this.setState({
			message: e.target.value
		});
	}

	// send the text off to the sendMessage function in App.js
	handleSubmit(e) {
		e.preventDefault();
		this.props.sendMessage(this.state.message);
		this.setState({
			message: ''
		});
	}

	render() {
		const disabled = this.state.message === '';
		return (
			<FormWrapper onSubmit={this.handleSubmit}>
				<input
					onChange={this.handleChange}
					value={this.state.message}
					placeholder="Type your message here and press Enter to send..."
					type="text"
				/>
				<CTAbtn disabled={disabled} onSubmit={this.handleChange}>
					Send
				</CTAbtn>
			</FormWrapper>
		);
	}
}
