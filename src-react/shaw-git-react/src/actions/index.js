import axios from "axios";
import qs from "qs";

import * as TYPES from "./types";

const urlEncodedHeader = {
	'Content-Type': 'application/json;charset=UTF-8'
  };

const getAuthHeader = () => {
	const token = localStorage.getItem(TYPES.keyToken);
	if (!token) {
		return false;
	}
	return { 
			headers: {
			'Content-Type': 'application/json;charset=UTF-8',
			'Authorization': 'Bearer ' + token
			}
		};
}

const getAuthHeaderParam = token => {
	return { 
			headers: {
			'Content-Type': 'application/json;charset=UTF-8',
			'Authorization': 'Bearer ' + token
			}
		};
}

const getAuthJSONHeader = () => {
	const token = localStorage.getItem(TYPES.keyToken);
	if (!token) {
		return false;
	}
	return { 
			headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + token
			}
		};
}

export const setLocale = lang => dispatch => {
	localStorage.setItem("srLang", lang);
	dispatch({ type: TYPES.LOCALE_SET, payload: lang });
};

export const fetchUser = () => async dispatch => {
	try {
		const res = await axios.get(TYPES.urlGetWaiter, getAuthHeader());
		localStorage.setItem(TYPES.keyWaiter, JSON.stringify(res.data));

		dispatch({ type: TYPES.WAITER, payload: res.data });
	} catch (error) {
		console.error("fetchUser error ", error);
	}
};

export const fetchTables = () => async dispatch => {
	try {
		const res = await axios.get(TYPES.urlGetTable, getAuthHeader());
		dispatch({ type: TYPES.TABLE, payload: res.data });
	} catch (error) {
		if (error.response) {
			const { status } = error.response;
			let timer = localStorage.getItem("timer");
			if(status === 401 && timer){
				clearTimeout(timer);
			}
		  }
	}
};

export const fetchMenuGroup = () => async dispatch => {
	try {
		const res = await axios.get(TYPES.urlGetMenuGroup, getAuthHeader());
		dispatch({ type: TYPES.MENU_GROUP, payload: res.data });
	} catch (error) {
		console.error("fetchMenuGroup error ", error);
	}
};

export const fetchMenus = menuGroupId => async dispatch => {
	try {
		const res = await axios.get(TYPES.urlGetMenus + '?MGroupName=' + menuGroupId, getAuthHeader());
		dispatch({ type: TYPES.MENUS, payload: res.data });
	} catch (error) {
		console.error("fetchMenus error ", error);
	}
};

export const updateMenus = menus => async dispatch => {
	try {
		dispatch({ type: TYPES.MENUS, payload: menus });
	} catch (error) {
		console.error("updateMenus error ", error);
	}
};

export const fetchOrder = tableId => async dispatch => {
	try {
		const res = await axios.get(TYPES.urlGetOrderList + '?TRID=' + tableId, getAuthHeader());
		dispatch({ type: TYPES.ORDERS, payload: res.data });
	} catch (error) {
		dispatch({ type: TYPES.ORDERS, payload: [] });
		console.error("fetchOrders error ", error);
	}
};

export const updateOrder = orders => async dispatch => {
	try {
		dispatch({ type: TYPES.ORDERS, payload: orders });
	} catch (error) {
		console.error("updateOrder error ", error);
	}
};

export const fetchBillOrder = tableId => async dispatch => {
	try {
		const res = await axios.get(TYPES.urlGetBillOrder + '?TRID=' + tableId, getAuthHeader());
		dispatch({ type: TYPES.BILL_ORDERS, payload: res.data });
	} catch (error) {
		dispatch({ type: TYPES.BILL_ORDERS, payload: [] });
		console.error("fetchBillOrder error ", error);
	}
};

export const fetchTnos = () => async dispatch => {
	try {
		const res = await axios.get(TYPES.urlGetTnos, getAuthHeader());
		dispatch({ type: TYPES.TNOS, payload: res.data });
	} catch (error) {
		console.error("fetchTnos error ", error);
	}
};

export const sendOrder = orders => async dispatch => {
	try {
		const res = await axios.post(TYPES.urlPostSendOrder, orders, getAuthHeader());
		dispatch({ type: TYPES.ORDERS, payload: res.data });
	} catch (error) {
		console.error("sendOrder error ", error);
	}
};

export const sendCancelOrder = (vrId, order) => async dispatch => {
	try {
		const res = await axios.post(TYPES.urlPostCancelOrder + '?VrID=' + vrId, order, getAuthHeader());
		if(res.data.p_commit === true){
			dispatch({ type: TYPES.ORDERS, payload: res.data });
		}
		return res.data;
	} catch (error) {
		console.error("sendCancelOrder error ", error);
		return false;
	}
};

export const sendBillOrder = (billEvent, printType, order) => async dispatch => {
	try {
		const res = await axios.post(TYPES.urlPostBillOrder + '?billEvent=' + billEvent + '&print='+ printType, order, getAuthJSONHeader());
		dispatch({ type: TYPES.BILL_ORDERS, payload: res.data });
	} catch (error) {
		console.error("sendBillOrder error ", error);
	}
};

export const sendDirectPaidOrder =  tableId => async dispatch => {
	try {
		const bills = await axios.get(TYPES.urlGetBillOrder + '?TRID=' + tableId, getAuthHeader());
		
		const res = await axios.post(TYPES.urlPostBillOrder + '?billEvent=BillNPaid&print=Slip', bills.data[0], getAuthJSONHeader());
		dispatch({ type: TYPES.BILL_ORDERS, payload: res.data });
	} catch (error) {
		console.error("sendDirectPaidOrder error ", error);
	}
};

export const signinUser = (email, password) => async dispatch => {
	
	const data = qs.stringify({
		username: email,
		password: password,
		grant_type: 'password'
	});
  const res = await axios.post(TYPES.urlLogin, data, urlEncodedHeader);
  
  let str = JSON.stringify(res.data);
	dispatch({ type: TYPES.AUTH_USER, payload: str });
	localStorage.setItem(TYPES.keyToken, res.data.access_token);
	localStorage.setItem(TYPES.keyUserName, res.data.userName);
	localStorage.setItem(TYPES.keyUser, str);
	
};

export const refreshToken = refresh_token => async dispatch => {
	
	const data = qs.stringify({
		refresh_token,
		grant_type: 'refresh_token'
	});
  const res = await axios.post(TYPES.urlLogin, data, urlEncodedHeader);
  
  let str = JSON.stringify(res.data);
	dispatch({ type: TYPES.AUTH_USER, payload: str });
	localStorage.setItem(TYPES.keyToken, res.data.access_token);
	localStorage.setItem(TYPES.keyUserName, res.data.userName);
	localStorage.setItem(TYPES.keyUser, str);
	
};

export const signout = history => async dispatch => {
	try {
		await axios.post(TYPES.urlLogout,null, getAuthHeader());
		dispatch({ type: TYPES.UNAUTH_USER, payload: false });
	} catch (error) {
		if (error.response) {
		const { status } = error.response;
			if(status === 401){
			let user = localStorage.getItem(TYPES.keyUser);
			if(user){
				let userData = JSON.parse(user);
				const data = qs.stringify({
					refresh_token: userData.refresh_token,
					grant_type: 'refresh_token'
				});
				  const res = await axios.post(TYPES.urlLogin, data, urlEncodedHeader);
				  const token = res.data.access_token;
				  await axios.post(TYPES.urlLogout,null, getAuthHeaderParam(token));
				  dispatch({ type: TYPES.UNAUTH_USER, payload: false });
				}
			}
		}
	} finally {
		await localStorage.removeItem(TYPES.keyToken);
		await localStorage.removeItem(TYPES.keyUserName);
		await localStorage.removeItem(TYPES.keyWaiter);
		await localStorage.removeItem(TYPES.keyUser)
	}
};