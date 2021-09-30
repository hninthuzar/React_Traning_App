import { Link } from "react-router-dom";
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { Form, Input, Button } from "antd";

const FormItem = Form.Item;
const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 6 }
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 16 }
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

const ComfirmForm = Form.create()(props => {
	const { getFieldDecorator } = props.form;
	return (
		<Form onSubmit={props.onSubmit}>
			<FormItem {...formItemLayout} label="Confirm Code">
				{getFieldDecorator("comfirmCode", {
					rules: [{ required: true, message: "Please input your code!" }]
				})(<Input placeholder="Code" />)}
			</FormItem>
			<FormItem {...buttonLayout}>
				<Button type="primary" htmlType="submit" className="right">
					Submit
				</Button>
				<Link to="/">Retry</Link>
			</FormItem>
		</Form>
	);
});

class ForgotPasswordComfirm extends Component {
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
						id="lbl.comfirmation"
						defaultMessage="Confirmation"
					/>
					<div className="smallFont">
						<FormattedMessage
							id="lbl.desc.comfirmation"
							defaultMessage="Code from mail"
						/>
					</div>
				</div>

				<ComfirmForm ref={this.saveFormRef} onSubmit={this.handleSubmit} />
			</div>
		);
	}
}
export default ForgotPasswordComfirm;
