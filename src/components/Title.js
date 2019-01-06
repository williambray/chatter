import React, { Component } from 'react';
import styled from 'styled-components';

const Nav = styled.div`
	padding: 1em;
	background: #56e39f;
	color: #fff;
	font-size: 18px;
	font-weight: 600;
	display: grid;
	grid-template-columns: 1fr auto;
	grid-row: 1;
	grid-column: span 2;
	/* -webkit-box-shadow: 0px -2px 16px 0px rgba(0, 0, 0, 0.75);
	-moz-box-shadow: 0px -2px 16px 0px rgba(0, 0, 0, 0.75);
	box-shadow: 0px -2px 16px 0px rgba(0, 0, 0, 0.75); */
	z-index: 2;
	h3 {
		margin: 0;
	}
`;

const LogOutBtn = styled.button`
	color: #fff;
	text-decoration: none;
	background: none;
	border: none;
	font-size: 16px;
	font-weight: 600;
	transition: 0.2s ease-in-out;
	cursor: pointer;
	:hover {
		color: #444;
	}
	&.active {
		color: #fff;
		font-weight: 600;
	}
	:focus {
		outline: none;
	}
`;

export default class Title extends Component {
	render() {
		return (
			<Nav>
				<h3>Chatter</h3>
				{this.props.loggedIn ? (
					<LogOutBtn onClick={this.props.logOut}>
						{this.props.currentUser} &#47;&#47; Log out
					</LogOutBtn>
				) : (
					''
				)}
			</Nav>
		);
	}
}
