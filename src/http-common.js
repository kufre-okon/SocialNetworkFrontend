import Axios from "axios";
import Storage from './utils/storage.util';

let axios = Axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL,
    headers: {
        Accept: 'application/json',
        "Content-type": "application/json"
    }
});

axios.interceptors.request.use((request) => {
    let logintoken = Storage.getItem('logintoken');
    if (logintoken) {
        request.headers = Object.assign({}, request.headers, {
            "Authorization": 'Bearer ' + logintoken
        })
    }
    // console.log(request);
    return request;
})

axios.interceptors.response.use((response) => {
    //console.log(response);
    return response.data;
}, error => {
    let errObj = {
        status: error.response ? error.response.status : null,
        data: {
            message: null,
            payload: null
        }
    };
    if (error.response && error.response.data) {
        errObj.data.message = error.response.data.message;
        errObj.data.payload = error.response.data.payload;
    }
    else if (error.message)
        errObj.data.message = error.message;

    if (errObj.status === 401)
        window.location = "/signIn";
    return Promise.reject(errObj);
});

export default axios;