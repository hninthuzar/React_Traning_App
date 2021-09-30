import axios from "axios";
import * as TYPES from "./types";
import * as api from "./apiEndpoint";

const getHeader = () => {
  return {
    //on later time >> can add token //
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  };
};

export const fetchCustomers = () => async (dispatch) => {
  try {
    const res = await axios.post(api.urlGetCustomer, getHeader());
    dispatch({ type: TYPES.CUSTOMER, payload: res.data });
  } catch (error) {
    dispatch({ type: TYPES.CUSTOMER, payload: [] });
    console.error("fetchCustomers error ", error);
  }
};

export const fetchItems = () => async (dispatch) => {
  try {
    const res = await axios.post(api.urlGetItem, getHeader());
    dispatch({ type: TYPES.ITEM, payload: res.data });
  } catch (error) {
    dispatch({ type: TYPES.ITEM, payload: [] });
    console.error("fetchItems error ", error);
  }
};
