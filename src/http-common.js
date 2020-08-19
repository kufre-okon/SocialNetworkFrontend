import Axios from "axios";
import AppConfig from './config';
import Storage from './utils/storage.util';


let axios = Axios.create({
    baseURL: AppConfig.BASE_API_URL,
    headers: {
        Accept: 'application/json',
        "Content-type": "application/json"
    }
});

axios.interceptors.request.use((request) => {
    let user = Storage.getItem('currentuser');
    if (user) {
        request.headers = Object.assign({}, request.headers, {
            "Authorization": 'Bearer ' + user.accessToken
        })
    }
    console.log(request);
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
    return Promise.reject(errObj);
});

export default axios;