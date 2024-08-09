import Axios from "axios";
import {message} from "antd";
import {store} from "../models";
import config from "../config";

const request = Axios.create({
    baseURL: config.BASE_API,
})

request.interceptors.request.use(request => {
    const token = store.getState().auth?.token

    if (token)
        request.headers.set('x-token', `${token.xToken}`)

    return request

})

request.interceptors.response.use(response => response, error => {
    if (error.response && error.response.status === 401) {
        store.dispatch.auth.logout()
    }
    if (error.response && error.response.data.msg) {
        message.error(error.response.data.msg)
    }
    return Promise.reject(error)
})

export default request
