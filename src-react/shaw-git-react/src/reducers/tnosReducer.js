import * as TYPES from "../actions/types";

export default function(state = [], action) {
	
	switch (action.type) {
		case TYPES.TNOS:
			return action.payload;
		default:
			return state;
	}
}
