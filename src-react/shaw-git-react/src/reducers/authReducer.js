import * as TYPES from "../actions/types";

export default function(state = false, action) {
	switch (action.type) {
		case TYPES.AUTH_USER:
			return action.payload;
		case TYPES.UNAUTH_USER:
			return action.payload;
		case TYPES.FETCH_USER:
			return action.payload || false;
		default:
			return state;
	}
}
