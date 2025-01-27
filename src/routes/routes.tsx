import Login from "../pages/login";
import Subscribe from "../pages/subscribe";
import Site from "../pages/site";
import Dashboard from "../pages/dashboard";
import Setting from "../pages/setting";
import NotFound from "../pages/not-found";
import ProIndex from '../pages/index/proIndex.tsx'
import RedirectDashboard from "../pages/redirect-dashboard";
import Downloader from "../pages/downloader";

export const routes = {
    '/login/:next?': {
        name: '登录',
        component: Login
    },
    '/': {
        component: ProIndex,
        children: {
            '/dashboard': {
                name: '仪表板',
                component: Dashboard
            },
            '/site': {
                name: '站点',
                component: Site
            },
            '/downloader': {
                name: '下载器',
                component: Downloader
            },
            '/subscribe': {
                name: '订阅',
                component: Subscribe
            },
            '/setting': {
                name: '设置',
                component: Setting
            },
            '/': {
                component: RedirectDashboard
            },
            '*': {
                name: '404',
                component: NotFound
            }
        }
    }
}