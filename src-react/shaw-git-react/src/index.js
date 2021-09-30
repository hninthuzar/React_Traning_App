import "antd/dist/antd.css";
import "./style/style.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import { addLocaleData } from "react-intl";
import en from "react-intl/locale-data/en";
import bm from "react-intl/locale-data/bm";
import App from "./components/App";
import reducers from "./reducers";
import { AUTH_USER, LOCALE_SET, keyUser } from "./actions/types";

addLocaleData(en);
addLocaleData(bm);

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

const srLang = localStorage.getItem("srLang");
if (srLang) {
	store.dispatch({ type: LOCALE_SET, payload: srLang });
}

const data = localStorage.getItem(keyUser);
// If we have a token, consider the user to be signed in
if (data) {
	// we need to update application state
	store.dispatch({ type: AUTH_USER, payload: data });
}

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector("#root")
);
