import request from "../utils/request";

export function login(userLogin: UserLogin) {
    return request.post('/auth/login', {...userLogin})
}

export function getUserInfo() {
    return request.request({
        method: "get",
        url: '/auth/user'
    })
}