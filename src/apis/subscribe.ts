import request from "../utils/request.ts";

export function get_subscribes(value: any) {
    return request.request({
        method: "post",
        url: "/subscribe/all",
        data: value
    })
}

export function edit_subscribe(values: any) {
    return request.request({
        method: "post",
        url: '/subscribe/',
        data: values
    })
}