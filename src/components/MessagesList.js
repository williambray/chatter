import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const MessageWrapper = styled.div`
	width: 100%;
	overflow: scroll;
	grid-column: 2;
	background: #fafafa;
`;

const Messages = styled.ul`
	list-style: none;
	padding: 0 0.8em;
`;

const Message = styled.li`
	margin: 0.5em;
	display: grid;
	p {
		border-radius: 15px;
		border-bottom-left-radius: 0px;
		padding: 0.6em;
		margin: 0;
		background: #59c9a5;
		color: #fff;
		width: fit-content;
	}
	div {
		color: #7e7e7e;
		font-size: 12px;
		padding-bottom: 0.2em;
	}
	&.right {
		justify-self: right;
		text-align: right;
	}
	&.right > p {
		justify-self: right;
		border-bottom-left-radius: 15px;
		border-bottom-right-radius: 0px;
		background: #444;
	}
`;

export default class MessagesList extends Component {
	componentWillUpdate() {
		const node = ReactDOM.findDOMNode(this);
		this.shouldScrollToBottom =
			node.scrollTop + node.clientHeight + 100 >= node.scrollHeight;
	}

	componentDidUpdate() {
		if (this.shouldScrollToBottom) {
			const node = ReactDOM.findDOMNode(this);
			node.scrollTop = node.scrollHeight;
		}
	}

	render() {
		const hasMessages = this.props.messages.length > 0;
		const inRoom =
			this.props.currentRoom !== ''
				? 'Start Talking!'
				: 'Join a room to start chatting!';
		return (
			<>
				{hasMessages ? (
					<MessageWrapper>
						<Messages>
							{this.props.messages.map(message => {
								const userMsg =
									message.sender.id === this.props.currentUser ? 'right' : '';
								return (
									<Message className={userMsg} key={message.id}>
										<div>{message.sender.name}</div>
										<p>{message.text}</p>
									</Message>
								);
							})}
						</Messages>
					</MessageWrapper>
				) : (
					<p className="centered">{inRoom}</p>
				)}
			</>
		);
	}
}
