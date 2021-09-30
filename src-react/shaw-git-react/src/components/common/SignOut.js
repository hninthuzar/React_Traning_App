import React, { Component } from "react";
import { connect } from "react-redux";
import { signout } from "../../actions";
class SignOut extends Component {
	
	componentDidMount = async () => {
       const { signout, history} = this.props;
	   await signout(history);
	   history.push("/");
    }
	render() {
		return <div>bye</div>;
	}
}

export default connect( null, { signout })(SignOut);

