import {LogoutOutlined} from "@ant-design/icons";
import {Dropdown, Layout, MenuProps} from "antd";
import Styles from './header.module.css'

interface HeaderProps {
    username: string
    logout: () => void
}

function Header(props: HeaderProps) {

    const items: MenuProps['items'] = [
        {
            label: '退出登录',
            key: 'logout',
            icon: <LogoutOutlined/>,
        }
    ]

    const onClick: MenuProps['onClick'] = ({key}) => {
        switch (key) {
            case 'logout':
                props.logout()
                break
        }
    }

    return (
        <Layout.Header className={Styles.container}>
            <span className={Styles.title}>RSS feed Toolbox</span>
            <Dropdown menu={{items, onClick}}>
                <div className={Styles.info_menu}>
                    <span className={Styles.logo}>
                        <img alt={''} src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"/>
                    </span>
                    <span
                        className={Styles.username}
                    >
                    {props.username}
                </span>
                </div>
            </Dropdown>
        </Layout.Header>
    )
}

export default Header