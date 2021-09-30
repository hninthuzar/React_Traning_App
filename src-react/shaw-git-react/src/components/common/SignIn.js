import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import { connect } from "react-redux";
import { signinUser, fetchUser, refreshToken } from "../../actions";
import { keyUser } from "../../actions/types";
const FormItem = Form.Item;

const LoginForm = Form.create()(props => {
	const { getFieldDecorator } = props.form;
	return (
		<Form onSubmit={props.onSubmit} className="form-size form-margin">
			<FormItem>
				{getFieldDecorator("email", {
					rules: [{ required: true, message: "Please input your username!" }]
				})(<Input placeholder="Waiter ID" />)}
			</FormItem>

			<FormItem>
				{getFieldDecorator("password", {
					rules: [{ required: true, message: "Please input your Password!" }]
				})(<Input type="password" placeholder="Password" />)}
			</FormItem>
			<FormItem>
				<Button type="primary" htmlType="submit" className="login-form-button">
					Log in (၀င္မည္)
				</Button>
			</FormItem>
			<span style={{ color: "red" }}>
				{props.loginStatus ? "" : props.loginMessage}
			</span>
		</Form>
	);
});

class SignIn extends Component {
	state = {
		loginStatus: false,
		loginMessage: ""
	};

	componentDidMount = () => {
		let user = localStorage.getItem(keyUser);
		if(user){
			try {
        let userData = JSON.parse(user);
        this.props.refreshToken(userData.refresh_token);
        this.props.fetchUser();
        this.setState({ loginStatus: true });
        this.props.history.push("/home");
			} catch (error) {
				console.error("error in getting userObject");
			}
		}
	}
	handleSubmit = e => {
		e.preventDefault();
		this.form.validateFields(async (err, values) => {
			if (!err) {
        try {
		      await this.props.signinUser(values.email, values.password);
		      await this.props.fetchUser();
          this.setState({ loginStatus: true });
          this.props.history.push("/home");
        } catch (error) {
			let message = "Network Error, Wifi ခ်ိတ္ေပးပါ";
			if (error.response) {
				message = error.response.data.error_description;
			}
			
          this.setState({
            		loginStatus: false,
            		loginMessage: message
            	});
        }
		}
		});
	};
	saveFormRef = form => {
		this.form = form;
	};
	render() {
		return (
			<div className="login-box">
				<span className="fontBold">Waiter Login</span>
				<LoginForm
					ref={this.saveFormRef}
					onSubmit={this.handleSubmit}
					loginStatus={this.state.loginStatus}
					loginMessage={this.state.loginMessage}
				/>
			</div>
		);
	}
}

export default connect( null, { signinUser, fetchUser, refreshToken })(SignIn);
