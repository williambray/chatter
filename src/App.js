import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';
import Title from './components/Title';
import MessagesList from './components/MessagesList';
import MessageForm from './components/MessageForm';
import Chatkit from '@pusher/chatkit-client';
import RoomList from './components/RoomList';
import LogIn from './components/LogIn';

const instanceLocator = 'v1:us1:a1771b71-4903-4370-98ca-6052adc44975';
const tokenProvider = new Chatkit.TokenProvider({
	url:
		'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/a1771b71-4903-4370-98ca-6052adc44975/token'
});
let username = localStorage.getItem('username');

const AppWrapper = styled.div`
	display: grid;
	grid-template-rows: auto 1fr auto;
	grid-template-columns: auto 1fr;
	overflow-x: scroll;
	height: 100vh;
	max-height: 100vh;
	.centered {
		align-self: center;
		justify-self: center;
		color: #343434;
	}
`;

class App extends Component {
	constructor() {
		super();
		this.state = {
			messages: [],
			joinableRooms: [],
			joinedRooms: [],
			currentRoom: ''
		};
		this.sendMessage = this.sendMessage.bind(this);
		this.subscribeToRoom = this.subscribeToRoom.bind(this);
		this.getRooms = this.getRooms.bind(this);
		this.createRoom = this.createRoom.bind(this);
		this.logIn = this.logIn.bind(this);
		this.tryLogin = this.tryLogin.bind(this);
		this.render = this.render.bind(this);
		this.logOut = this.logOut.bind(this);
	}

	// Init chatManager and link to ChatKit instance.
	componentDidMount() {
		this.tryLogin();
	}

	tryLogin() {
		if (username === null) {
			return;
		}
		const chatManager = new Chatkit.ChatManager({
			instanceLocator: instanceLocator,
			userId: username,
			tokenProvider: tokenProvider
		});

		// Connect the current user up to ChatKit
		chatManager
			.connect()
			.then(currentUser => {
				this.currentUser = currentUser;
				this.getRooms();
			})
			.catch(err => {
				alert('User does not exist');
				localStorage.removeItem('username');
			});
	}

	getRooms() {
		this.currentUser
			.getJoinableRooms()
			.then(joinableRooms => {
				this.setState({
					joinableRooms,
					joinedRooms: this.currentUser.rooms
				});
			})
			.catch(err => console.log('error on joinableRooms:', err));
	}

	subscribeToRoom(roomId) {
		this.setState({
			messages: []
		});
		this.currentUser
			.subscribeToRoom({
				roomId: roomId,
				hooks: {
					onMessage: message => {
						this.setState({ messages: [...this.state.messages, message] });
					}
				},
				messageLimit: 100
			})
			.then(room => {
				this.setState({ currentRoom: roomId });
				this.getRooms();
			})
			.catch(err => console.log('error on subscribing to room:', err));
	}

	// Send the message to the chatkit instance.
	sendMessage(text) {
		this.currentUser.sendMessage({
			text,
			roomId: this.state.currentRoom
		});
	}

	createRoom(name) {
		this.currentUser
			.createRoom({
				name
			})
			.then(room => this.subscribeToRoom(room.id))
			.catch(err => console.log('error with createRoom: ', err));
	}

	logIn(name) {
		// Add to state
		username = name;
		// Login
		this.tryLogin();
		// Save username to storage
		localStorage.setItem('username', name);
	}

	logOut() {
		// Clear username from storage
		localStorage.removeItem('username');
		username = '';
		window.location.reload();
	}

	render() {
		const loggedIn = username !== null;
		return (
			<AppWrapper>
				<Title
					loggedIn={loggedIn}
					currentUser={username}
					logOut={this.logOut}
				/>
				{loggedIn ? (
					<>
						<RoomList
							rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
							activeRoom={this.state.currentRoom}
							subscribeToRoom={this.subscribeToRoom}
							createRoom={this.createRoom}
						/>
						<MessagesList
							currentRoom={this.state.currentRoom}
							messages={this.state.messages}
							currentUser={username}
						/>
						<MessageForm sendMessage={this.sendMessage} />
					</>
				) : (
					<LogIn logIn={this.logIn} />
				)}
			</AppWrapper>
		);
	}
}

export default App;
