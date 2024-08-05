import React from "react";
import {
    ModalForm,
    ModalFormProps,
    ProForm,
    ProFormDigit, ProFormItem,
    ProFormList,
    ProFormText,
    ProFormTextArea
} from "@ant-design/pro-components";

interface ModifyModalProps extends ModalFormProps {

}

function ModifyModal(props: ModifyModalProps) {

    const {...otherProps} = props


    return (
        <ModalForm
            {...otherProps}
        >
            <ProFormItem name={'id'} noStyle/>
            <ProForm.Group>
                <ProFormText width={'md'} name="name" required label="下载器名称" placeholder="请输入下载器名称"
                             rules={[{required: true, message: '这是必填项'}]}/>
            </ProForm.Group>
            <ProForm.Group>
                <ProFormText width={'md'} name="host" label="地址" placeholder="请填地址"
                             rules={[{required: true, message: '这是必填项'}]}/>
                <ProFormDigit width={'md'} name="port" label='端口' placeholder="请填端口"
                              rules={[{required: true, message: '这是必填项'}]}/>
                <ProFormText width={'md'} name="username" label='用户名' placeholder="请填用户名"
                             rules={[{required: true, message: '这是必填项'}]}/>
                <ProFormText.Password width={'md'} name="password" label='密码' placeholder="请填密码"
                                      rules={[{required: true, message: '这是必填项'}]}/>
            </ProForm.Group>
        </ModalForm>
    )
}

export default ModifyModal