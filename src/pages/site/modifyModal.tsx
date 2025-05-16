import React from "react";
import {
    ModalForm,
    ModalFormProps, ProCard,
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
        <ModalForm {...otherProps} layout={"vertical"} grid={true}>
            <ProFormItem name={'id'} noStyle/>
            <ProFormText colProps={{span: 5}} name="name" rules={[{ required: true, message: '请填写站点名称！' }]} label="站点名称"/>
            <ProFormText colProps={{span: 16}} name="url" rules={[{ required: true, message: '请填写站点URL!' }]} label="站点URL"/>
            <ProFormDigit colProps={{span: 3}} name={'time_out'} label={'超时时间'}/>
            <ProFormTextArea colProps={{span: 24}} name="cookie" label="Cookie" fieldProps={{rows: 4}}/>
            <ProFormTextArea colProps={{span: 24}} name="ua" label='UA' fieldProps={{rows: 2}}/>
            <ProFormList name="site_rss" label="RSS">
                <ProForm.Group>
                    <ProFormItem name={'id'} noStyle/>
                    <ProFormText colProps={{span: 6}} name="alias" rules={[{ required: true, message: '请填写别名!' }]} label="别名"/>
                    <ProFormText colProps={{span: 18}} name="url" rules={[{ required: true, message: '请填写RSS URL!' }]} label="URL"/>
                </ProForm.Group>
            </ProFormList>
        </ModalForm>
    )
}

export default ModifyModal