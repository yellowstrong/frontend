import {useDispatch, useSelector} from "react-redux";
import {Dispatch, RootState} from "../../models";
import {Navigate, useParams} from "react-router-dom";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {LoginForm, ProFormCheckbox, ProFormText} from "@ant-design/pro-components";

function Login() {

    const authDispatch = useDispatch<Dispatch>().auth
    const token = useSelector((state: RootState) => state.auth?.token)
    const isLoading = useSelector((state: RootState) => state.loading.effects.auth.login)
    const {next} = useParams<{ next: string | undefined }>()


    function doLogin(userLogin: UserLogin) {
        authDispatch.login(userLogin)
    }

    return !token ? (
        <div style={{height:'100vh',paddingTop:100}}>
            <LoginForm
                logo=""
                title="RSS影视订阅"
                subTitle="通过RSS实时订阅电影、电视剧实现自动下载整理"
                onFinish={doLogin}
                loading={isLoading}>
                <ProFormText
                    name="username"
                    fieldProps={{
                        size: 'large',
                        prefix: <UserOutlined className={'prefixIcon'}/>,
                    }}
                    placeholder={'用户名'}
                    rules={[
                        {
                            required: true,
                            message: '请输入用户名!',
                        },
                    ]}
                />
                <ProFormText.Password
                    name="password"
                    fieldProps={{
                        size: 'large',
                        prefix: <LockOutlined className={'prefixIcon'}/>,
                    }}
                    placeholder={'密码'}
                    rules={[
                        {
                            required: true,
                            message: '请输入密码！',
                        },
                    ]}
                />
                <div style={{marginBlockEnd: 24,}}>
                    <ProFormCheckbox noStyle name="autoLogin">自动登录</ProFormCheckbox>
                    <a style={{float: 'right',}}>忘记密码</a>
                </div>
            </LoginForm>
        </div>
    ) : (
        <Navigate to={decodeURIComponent(next || '/')}/>
    )
}

export default Login