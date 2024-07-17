import {Button, Form, Input} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch, RootState} from "../../models";
import {Navigate, useParams} from "react-router-dom";
import {LockOutlined, UserOutlined, EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons";

function Login() {

    const authDispatch = useDispatch<Dispatch>().auth
    const token = useSelector((state: RootState) => state.auth?.token)
    const isLoading = useSelector((state: RootState) => state.loading.effects.auth.login)
    const {next} = useParams<{ next: string | undefined }>()


    function doLogin(userLogin: UserLogin) {
        authDispatch.login(userLogin)
    }

    return !token ? (
        <div className={'flex flex-col items-center h-full w-full overflow-auto bg-login-bg bg-100%'}>
            <div className={'flex flex-col justify-center items-center mt-32'}>
                <span className={'text-4xl'}>RSS Feed Toolbox</span>
                <span className={'text-l mt-3 mb-10 text-gray-400'}>这是一个简易的RSS订阅工具箱</span>
                <div className={'w-96'}>
                    <Form onFinish={doLogin}>
                        <Form.Item name={'username'} rules={[{required: true, message: '请输入用户名'}]}>
                            <Input size={"large"} placeholder={'请输入用户名'} prefix={<UserOutlined/>}/>
                        </Form.Item>
                        <Form.Item name={'password'} rules={[{required: true, message: '请输入密码'}]}>
                            <Input.Password
                                size={"large"}
                                placeholder={'请输入密码'}
                                prefix={<LockOutlined/>}
                                iconRender={(visible) => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}

                            />
                        </Form.Item>
                        <Button
                            style={{marginTop: 20}}
                            loading={isLoading}
                            htmlType={"submit"}
                            className={'w-full'}
                            size={"large"}
                            type={"primary"}>
                            登录
                        </Button>
                    </Form>
                </div>
            </div>

        </div>
    ) : (
        <Navigate to={decodeURIComponent(next || '/')}/>
    )
}

export default Login