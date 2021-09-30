import { LOCALE_SET } from "../actions/types";

export default (state = "en", action) => {
	switch (action.type) {
		case LOCALE_SET:
			return action.payload;

		default:
			return state;
	}
};
