import axios from "axios"

const tokennn = localStorage.getItem('token')
axios.interceptors.request.use(function (config) {
    const header_token = 'Bearer ';
    const token = header_token + tokennn;
    if (token) {
        config.headers.Authorization = token;
        config.headers['If-None-Match'] = '';
    }
    return config;
})