import request from "../utils/request.ts";

export function getSchedulers() {
    return request.request({
        method: 'get',
        url: '/scheduler/'
    })
}

export function runScheduler(id: string) {
    return request.request({
        method: 'get',
        url: '/scheduler/run',
        params: {id: id}
    })
}