import request from "../utils/request.ts";

export function get_all_site_rss() {
    return request.request({
        url: '/site/rss',
        method: 'get'
    })
}