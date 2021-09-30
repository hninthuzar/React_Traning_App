import { Link } from "react-router-dom";
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { Form, Input, Button } from "antd";

const FormItem = Form.Item;
const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 4 }
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 18 }
	}
};
const buttonLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 2 }
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 22 }
	}
};

const ForgotForm = Form.create()(props => {
	const { getFieldDecorator } = props.form;
	return (
		<Form onSubmit={props.onSubmit}>
			<FormItem {...formItemLayout} label="Email">
				{getFieldDecorator("email", {
					rules: [{ required: true, message: "Please input your Email!" }]
				})(<Input placeholder="Email" />)}
			</FormItem>
			<FormItem {...buttonLayout}>
				<Button type="primary" htmlType="submit" className="right">
					Send Code
				</Button>
				<Link to="/">Retry</Link>
			</FormItem>
		</Form>
	);
});

class ForgotPassword extends Component {
	handleSubmit = e => {
		e.preventDefault();
		this.form.validateFields((err, values) => {
			if (!err) {
			}
		});
	};
	saveFormRef = form => {
		this.form = form;
	};
	render() {
		return (
			<div className="signup-box">
				<div className="signup-text">
					<FormattedMessage
						id="lbl.forgot.password"
						defaultMessage="Forgot Password?"
					/>
					<div className="smallFont">
						<FormattedMessage
							id="lbl.desc.forgot.password"
							defaultMessage="Don't worry!"
						/>
					</div>
				</div>

				<ForgotForm ref={this.saveFormRef} onSubmit={this.handleSubmit} />
			</div>
		);
	}
}
export default ForgotPassword;
