import {Layout} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {Dispatch, RootState} from "../../models";
import {Navigate, Outlet} from "react-router-dom";
import Header from "./components/header.tsx";
import Menubar from "./components/menubar.tsx";
import Styles from './index.module.css'
import {useState} from "react";

const {Content, Sider} = Layout


function Index() {

    const [collapsed] = useState(false)
    const authDispatch = useDispatch<Dispatch>().auth
    const token = useSelector((state: RootState) => state.auth?.token)
    const user = useSelector((state: RootState) => state.auth?.user)


    return token ? (
        <Layout className={Styles.container}>
            <img className={Styles.page_bg} alt={''}
                 src="https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr"/>
            <Header username={user?.username || 'administrator'} logout={authDispatch.logout}/>
            <Layout>
                <Sider className={Styles.side} collapsed={collapsed} width={collapsed ? 64 : 256}>
                    <Menubar/>
                </Sider>
                <Layout className={Styles.content_layout} style={{marginLeft: collapsed ? 64 : 256}}>
                    <Content className={Styles.content}>
                        <Outlet/>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    ) : (
        <Navigate to={'/login'}/>
    )
}

export default Index;