import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { setLocale, signout } from "../actions";

const { Header } = Layout;

class Headerr extends Component {
	onSignOut = () =>{
		this.props.signout();
	}
	renderSignOutLink() {
		if (!this.props.auth) {
			return null;
		} else {
			return (
				<Menu.Item key="4" style={{ float: "right" }}>
					<Link to="/signout">Sign Out</Link>
				</Menu.Item>
			);
		}
	}
	render() {
		let userName = "GG";
		if( this.props.auth){
			let data = JSON.parse(this.props.auth)
			userName = data.userName;
		}

		return (
			<Layout style={{ marginBottom: 50 }}>
				<Header
					style={{
						position: "fixed",
						zIndex: 1,
						width: "100%",
						backgroundColor:'#388e3c',
						height: 50
					}}>
					<Link to="/home" className="logo">
					  {userName}
					</Link>
					<Menu theme="dark" mode="horizontal" style={{ lineHeight: "50px", backgroundColor:'#388e3c' }}>
						{this.renderSignOutLink()}
					</Menu>
				</Header>
			</Layout>
		);
	}
}

const mapStateToProps = ({ auth }) => {
	return { auth };
};

export default connect(
	mapStateToProps,
	{ setLocale, signout }
)(Headerr);
