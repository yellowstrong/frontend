import request from "../utils/request.ts";

export function get_sites(value: any) {
    return request.request({
        method: "post",
        url: "/site/all",
        data: value
    })
}

export function edit_site(values: any) {
    return request.request({
        method: "post",
        url: "/site/",
        data: values
    })
}


export function get_site_rss() {
    return request.request({
        url: '/site/rss',
        method: 'get'
    })
}
