import { combineReducers } from "redux";
import authReducer from "./authReducer";
import localeReducer from "./localeReducer";
import waiterReducer from "./waiterReducer";
import tablesReducer from "./tablesReducer";
import menuGroupReducer from "./menuGroupReducer";
import menuReducer from "./menuReducer";
import tnosReducer from "./tnosReducer";
import ordersReducer from "./ordersReducer";
import billReducer from "./billReducer";

export default combineReducers({
	auth: authReducer,
	waiter: waiterReducer,
	tables: tablesReducer,
	menuGroup: menuGroupReducer,
	menus: menuReducer,
	tnos: tnosReducer,
	orders: ordersReducer,
	bills: billReducer,
	locale: localeReducer
});
