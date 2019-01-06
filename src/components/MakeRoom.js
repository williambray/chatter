import React, { Component } from 'react';
import styled from 'styled-components';

const NewRoomWrapper = styled.form`
	padding: 1em 0;
	display: grid;
	min-height: 50px;
	grid-row: 3;
	grid-template-columns: 1fr auto;
	input {
		font-size: 16px;
		color: #fafafa;
		padding: 0.5em;
		border: none;
		background: #2a2d34;
	}
	input::placeholder {
		color: #7e7e7e;
	}
	input:focus {
		outline: none;
	}
`;

const AddRoomBtn = styled.button`
	color: #56e39f;
	background: none;
	border: none;
	padding: 0.5em;
	height: 100%;
	font-size: 22px;
	font-weight: 600;
	:disabled {
		color: #7e7e7e;
	}
`;

export default class MakeRoom extends Component {
	constructor() {
		super();
		this.state = {
			roomName: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(e) {
		this.setState({
			roomName: e.target.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.createRoom(this.state.roomName);
		this.setState({ roomName: '' });
	}

	render() {
		const disabled = this.state.roomName === '';
		return (
			<NewRoomWrapper onSubmit={this.handleSubmit}>
				<input
					onChange={this.handleChange}
					type="text"
					placeholder="Create new room..."
					value={this.state.roomName}
					required
				/>
				<AddRoomBtn disabled={disabled} onSubmit={this.handleChange}>
					+
				</AddRoomBtn>
			</NewRoomWrapper>
		);
	}
}
