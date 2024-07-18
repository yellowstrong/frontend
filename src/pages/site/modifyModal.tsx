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
                <ProFormText width={'sm'} name="name" required label="站点名称" placeholder="请输入站点名称"
                             rules={[{required: true, message: '这是必填项'}]}/>
                <ProFormText width={'lg'} name="url" required label="站点URL" placeholder="请输入站点URL"
                             rules={[{required: true, message: '这是必填项'}]}/>
            </ProForm.Group>
            <ProForm.Group>
                <ProFormTextArea width={'md'} name="cookie" label="Cookie" placeholder="请填写Cookie"
                                 fieldProps={{rows: 4}}
                                 rules={[{required: true, message: '这是必填项'}]}/>
                <ProFormTextArea width={'md'} name="ua" label='UA' placeholder="请填写UA" fieldProps={{rows: 4}}/>
            </ProForm.Group>
            <ProForm.Group>
                <ProFormDigit width={'sm'} name={'time_out'} label={'超时时间'}/>
            </ProForm.Group>
            <ProFormList
                name="site_rss"
                label="RSS"
            >
                <ProFormItem name={'id'} noStyle/>
                <ProForm.Group>
                    <ProFormText width={'sm'} name="alias" required label="别名" placeholder="请输入别名"
                                 rules={[{required: true, message: '这是必填项'}]}/>
                    <ProFormText width={'lg'} name="url" required label="URL" placeholder="请输入URL"
                                 rules={[{required: true, message: '这是必填项'}]}/>
                </ProForm.Group>
            </ProFormList>
        </ModalForm>
    )
}

export default ModifyModal