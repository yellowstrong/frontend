import ReactDOM from 'react-dom/client'
import App from './pages/App.tsx'
import './index.css'
import {Provider} from "react-redux";
import {ConfigProvider} from "antd";
import zhCN from "antd/lib/locale/zh_CN"
import dayjs from "dayjs";
import localizedFormat from 'dayjs/plugin/localizedFormat'
import "dayjs/locale/zh-cn"
import {store} from "./models";
import {BrowserRouter} from "react-router-dom";

dayjs.extend(localizedFormat)
dayjs.locale('zh-cn')

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <BrowserRouter>
            <ConfigProvider locale={zhCN}>
                <App/>
            </ConfigProvider>
        </BrowserRouter>
    </Provider>,
)
