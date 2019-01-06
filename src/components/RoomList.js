import React, { Component } from 'react';
import styled from 'styled-components';
import MakeRoom from './MakeRoom';

const ListWrapper = styled.div`
	background: #2a2d34;
	max-width: 500px;
	min-width: 175px;
	width: 250px;
	display: grid;
	grid-row: span 3;
	overflow: scroll;
	resize: horizontal;
	grid-template-rows: auto 1fr auto;
	h2 {
		color: #fcfcfc;
		padding-left: 0.7em;
	}
	h4 {
		color: #fcfcfc;
		margin: 0 0 0.5em 0;
	}
	ul {
		padding-left: 1em;
		margin-top: 0;
	}
	li {
		list-style: none;
		margin: 0 0 0.5em 0;
	}
	@media (max-width: 600px) {
		& {
		}
	}
`;

const RoomBtn = styled.button`
	color: #a2a2a2;
	text-decoration: none;
	background: none;
	border: none;
	font-size: 16px;
	width: 100%;
	text-align: left;
	transition: 0.1s ease-in-out;
	:hover {
		color: #fff;
	}
	&.active {
		color: white;
		font-weight: 600;
	}
	:focus {
		outline: none;
	}
	span.active {
		color: #56e39f;
		font-size: 18px;
		font-weight: 600;
	}
`;

export default class RoomList extends Component {
	render() {
		const orderedRooms = [...this.props.rooms].sort((a, b) => a.id - b.id);
		return (
			<ListWrapper>
				<h2>Rooms</h2>
				<ul>
					{orderedRooms.map(room => {
						const active = this.props.activeRoom === room.id ? 'active' : '';
						return (
							<li key={room.id}>
								<RoomBtn
									className={active}
									onClick={() => {
										this.props.subscribeToRoom(room.id);
									}}
								>
									<span className={active}>#</span> {room.name}
								</RoomBtn>
							</li>
						);
					})}
				</ul>
				<MakeRoom createRoom={this.props.createRoom} />
			</ListWrapper>
		);
	}
}
