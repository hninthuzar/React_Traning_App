import axios from "axios";
import { toast } from 'react-toastify';

axios.defaults.baseURL= process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, error => {
  const expectedError = 
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if(!expectedError){
    console.log("Logging the error", error);
    toast.error("An unexpected error occurred.");
    //toast("An unexpected error occurred.");
  }

  return Promise.reject(error);
});

function setJwt(jwt){
  //common is used for all method, post/update/delete/get //
  axios.defaults.headers.common['x-auth-token'] = jwt;
}

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    setJwt
}