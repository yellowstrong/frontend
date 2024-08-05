import request from "../utils/request.ts";

export function get_downloaders(value: any) {
    return request.request({
        method: "post",
        url: "/downloader/all",
        data: value
    })
}

export function edit_downloader(values: any) {
    return request.request({
        method: "post",
        url: '/downloader/',
        data: values
    })
}

export function set_default_downloader(id: number) {
    return request.request({
        method: "post",
        url: '/downloader/setDefault',
        data: {id: id}
    })
}