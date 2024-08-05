import {
    AppstoreOutlined,
    DownloadOutlined,
    HomeOutlined,
    LogoutOutlined,
    SettingOutlined,
    StarOutlined,
} from '@ant-design/icons';
import {PageContainer, ProCard, ProLayout} from '@ant-design/pro-components';
import {Dropdown,} from 'antd';
import React, {useEffect, useState} from 'react';
import {Navigate, Outlet, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch, RootState} from "../../models";

const routes = {
    path: '/',
    routes: [
        {
            path: '/dashboard',
            name: '仪表板',
            icon: <HomeOutlined/>
        },
        {
            path: '/subscribe',
            name: '订阅管理',
            icon: <StarOutlined/>
        },
        {
            path: '/site',
            name: '站点配置',
            icon: <AppstoreOutlined/>
        },
        {
            path: '/downloader',
            name: '下载器配置',
            icon: <DownloadOutlined />
        },
        {
            path: '/setting',
            name: '系统设置',
            icon: <SettingOutlined/>
        }
    ]
}

export default function ProIndex() {

    const navigate = useNavigate()
    const [pathname, setPathname] = useState<string>()
    const authDispatch = useDispatch<Dispatch>().auth
    const token = useSelector((state: RootState) => state.auth?.token)
    const user = useSelector((state: RootState) => state.auth?.user)

    useEffect(() => {
        if (!pathname)
            setPathname(document.location.pathname)
        if (!user)
            authDispatch.getUserInfo()
    }, []);

    const avatarProps = {
        src: user?.avatar || 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
        size: 'small',
        title: user?.username || 'Administrator',
        render: (_: any, dom: any) => {
            return (
                <Dropdown
                    menu={{
                        items: [
                            {
                                key: 'logout',
                                icon: <LogoutOutlined/>,
                                label: '退出登录',
                                onClick: () => authDispatch.logout()
                            }
                        ]
                    }}
                >
                    {dom}
                </Dropdown>
            )
        }
    }

    function renderHeader(logo: any, title: any, props: any) {
        const defaultDom = (
            <a>
                {logo}
                {title}
            </a>
        );
        if (typeof window === 'undefined') return defaultDom;
        if (document.body.clientWidth < 1400) {
            return defaultDom;
        }
        if (props.isMobile) return defaultDom;
        return (
            <>
                {defaultDom}
            </>
        );
    }

    function renderMenu(item: any, dom: any) {
        return <div onClick={() => {
            setPathname(item.path)
            navigate(item.path)
        }}>
            {dom}
        </div>
    }

    return token ? (
        <ProLayout
            fixSiderbar={true}
            layout={'mix'}
            location={{pathname}}
            siderMenuType={"sub"}
            route={routes}
            avatarProps={avatarProps as any}
            headerTitleRender={(logo, title, props) => renderHeader(logo, title, props)}
            onMenuHeaderClick={(e) => console.log(e)}
            menuItemRender={(item, dom) => renderMenu(item, dom)}
        >
            <PageContainer>
                <ProCard>
                    <Outlet/>
                </ProCard>
            </PageContainer>
        </ProLayout>

    ) : (
        <Navigate to={'/login'}/>
    )
}