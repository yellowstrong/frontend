import React, {useEffect, useState} from "react";
import {
    ModalForm,
    ModalFormProps,
    ProForm,
    ProFormCheckbox,
    ProFormSelect,
    ProFormText
} from "@ant-design/pro-components";
import {get_site_rss} from "../../apis/site.ts";

interface ModifyModalProps extends ModalFormProps {

}

function ModifyModal(props: ModifyModalProps) {

    const {...otherProps} = props
    const [rss, setRss] = useState<any>([])

    useEffect(() => {
        get_site_rss().then((res) => {
            setRss(res.data.data.map((item: any) => {
                return {
                    label: `${item.alias} - ${item.url}`,
                    value: item.id
                }
            }))
        })
    }, []);

    return (
        <ModalForm
            {...otherProps}
        >
            <ProForm.Group>
                <ProFormText width="sm" name="name" required label="订阅名称" placeholder="请输入订阅名称"
                             rules={[{required: true, message: '这是必填项'}]}
                />
                <ProFormSelect width="lg" name="site_rss_id" required label="关联RSS" placeholder="请选择RSS"
                               rules={[{required: true, message: '这是必填项'}]} options={rss}
                />
            </ProForm.Group>
            <ProForm.Group>
                <ProFormText width="sm" name="match_title" label="匹配名称" placeholder="正则式"
                             rules={[{required: true, message: '这是必填项'}]}/>
                <ProFormText width="sm" name="match_season" label="匹配季" placeholder="正则式"/>
                <ProFormText width="sm" name="match_team" label="匹配制作组" placeholder="正则式"/>
            </ProForm.Group>
            <ProForm.Group>
                <ProFormCheckbox.Group name={'include'} label={'包含'}
                                       options={['4k', '1080P', '720P', 'DV', 'HDR', 'EDR', 'HQ', '60fps']}/>
                <ProFormCheckbox.Group name={'exclude'} label={'排除'}
                                       options={['4k', '1080P', '720P', 'DV', 'HDR', 'EDR', 'HQ', '60fps']}/>
            </ProForm.Group>
            <ProForm.Group>
                <ProFormText width="md" name="download_path" label="下载路径"/>
                <ProFormText width="md" name="transfer_path" label="转移路径"/>
            </ProForm.Group>
        </ModalForm>
    )
}

export default ModifyModal