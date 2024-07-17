import {CrownFilled} from '@ant-design/icons';

export default {
    route: {
        path: '/',
        routes: [
            {
                path: '/dashboard',
                name: '仪表板'
            },
            {
                path: '/page1',
                name: '一级页面1',
                icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
                component: './Welcome',
                routes: [
                    {
                        path: '/page1/sub1',
                        name: '一级页面1sub',
                        icon: <CrownFilled/>,
                        component: './Welcome',
                    }
                ]
            },
            {
                path: '/page2',
                name: '一级页面2',
                icon: <CrownFilled/>,
                component: './Welcome',
                routes: [
                    {
                        path: '/page2/sub1',
                        name: '一级页面2sub',
                        icon: <CrownFilled/>,
                        component: './Welcome',
                    }
                ]
            },
            {
                path: '/page3',
                name: '一级页面3',
                icon: <CrownFilled/>,
                component: './Welcome',
            },
        ],
    },
    location: {
        pathname: '/',
    },
};
