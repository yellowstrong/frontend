import {ReactNode} from "react";
import Styles from './pageHeaderLayout.module.css'
import {PageHeader} from "@ant-design/pro-components";
import {useNavigate} from "react-router-dom";
import {RouteContext} from '../utils/context.ts'

interface PageHeaderLayoutProps {
    children: ReactNode,
    canBack?: boolean,
}

function PageHeaderLayout(props: PageHeaderLayoutProps) {

    const navigate = useNavigate();
    const {children, canBack = false} = props

    return (
        <div>
            <RouteContext.Consumer>
                {props => {
                    return (
                        <PageHeader ghost={false}
                                    className={Styles.pageHeader}
                                    title={props?.name}
                                    onBack={canBack ? () => {
                                        navigate(-1)
                                    } : undefined}
                        />
                    )
                }}
            </RouteContext.Consumer>
            <div className={Styles.children}>
                {children}
            </div>
        </div>
    )
}

export default PageHeaderLayout