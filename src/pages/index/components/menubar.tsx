import {Menu, MenuProps} from "antd";
import {AppstoreOutlined, HomeOutlined, SettingOutlined, StarOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import Styles from './menubar.module.css'
import {useState} from "react";

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        label: '仪表板',
        key: '/dashboard',
        icon: <HomeOutlined/>
    },
    {
        label: '订阅管理',
        key: '/subscribe',
        icon: <StarOutlined/>,
    },
    {
        label: '站点管理',
        key: '/site',
        icon: <AppstoreOutlined/>,
    },
    {
        label: '系统配置',
        key: '/sys',
        icon: <SettingOutlined/>,
    }
]

interface LevelKeysProps {
    key?: string;
    children?: LevelKeysProps[];
}


const getLevelKeys = (items1: LevelKeysProps[]) => {
    const key: Record<string, number> = {};
    const func = (items2: LevelKeysProps[], level = 1) => {
        items2.forEach((item) => {
            if (item.key) {
                key[item.key] = level;
            }
            if (item.children) {
                func(item.children, level + 1);
            }
        });
    };
    func(items1);
    return key;
};

const levelKeys = getLevelKeys(items as LevelKeysProps[]);

function Menubar() {

    const navigate = useNavigate()
    const [stateOpenKeys, setStateOpenKeys] = useState<string[]>([]);
    const onOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
        const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
        // open
        if (currentOpenKey !== undefined) {
            const repeatIndex = openKeys
                .filter((key) => key !== currentOpenKey)
                .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

            setStateOpenKeys(
                openKeys
                    // remove repeat key
                    .filter((_, index) => index !== repeatIndex)
                    // remove current level all child
                    .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
            );
        } else {
            // close
            setStateOpenKeys(openKeys);
        }
    };

    return (

        <Menu
            className={Styles.menu}
            onClick={(e) => navigate(e.key)}
            mode="inline"
            theme="light"
            openKeys={stateOpenKeys}
            onOpenChange={onOpenChange}
            items={items}
        />

    )
}

export default Menubar