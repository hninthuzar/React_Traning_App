import * as TYPES from "../actions/types";

export default function(state = [], action) {
	
	switch (action.type) {
		case TYPES.MENU_GROUP:
			return action.payload;
		default:
			return state;
	}
}
