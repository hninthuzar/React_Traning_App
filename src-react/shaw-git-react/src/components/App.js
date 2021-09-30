import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { IntlProvider } from "react-intl";
import SignUp from "./common/SignUp";
import messages from "../const/messages";
import Header from "./Header";
import NotFound from "./NotFound";
import SignIn from "./common/SignIn";
import Landing from "./Landing";
import Order from "./order/Order";
import Cancel from "./order/Cancel";
import Bill from "./order/Bill";
import { fetchUser } from "../actions";
import SignOut from "./common/SignOut";

class App extends Component {
	componentDidMount = () => {
		this.props.fetchUser();
	}
	render() {
		const { lang, waiter } = this.props;
		if(waiter && !waiter.WaiterID){
		return(	
			<IntlProvider locale={lang} messages={messages[lang]}>
				<BrowserRouter>
					<div>
						<Header />
						<Switch>
							<Route exact path="/" component={SignIn} />
							<Route exact path="/signout" component={SignOut} />
							<Route component={NotFound} />
						</Switch>
					</div>
				</BrowserRouter>
			</IntlProvider>
		)
		}
		
		return (
			<IntlProvider locale={lang} messages={messages[lang]}>
				<BrowserRouter>
					<div>
						<Header />
						<Switch>
							<Route exact path="/" component={SignIn} />
							<Route exact path="/signup" component={SignUp} />
							<Route exact path="/home" component={Landing} />
							<Route exact path="/order/:id/:name" component={Order} />
							<Route exact path="/cancel/:id/:name" component={Cancel} />
							<Route exact path="/bill/:id/:name/:status" component={Bill} />
							<Route exact path="/signout" component={SignOut} />
							<Route component={NotFound} />
						</Switch>
					</div>
				</BrowserRouter>
			</IntlProvider>
		);
	}
}
function mapStateToProps({ locale, waiter, auth }) {
	return {
		lang: locale, waiter, auth
	};
}

export default connect(mapStateToProps, { fetchUser})(App);
