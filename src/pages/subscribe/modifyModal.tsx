import React, {useEffect, useState} from "react";
import {
    ModalForm,
    ModalFormProps,
    ProForm,
    ProFormCheckbox, ProFormDigit, ProFormItem,
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
        <ModalForm{...otherProps} layout={'vertical'} grid={true}>
            <ProFormItem name={'id'} noStyle/>
            <ProFormText colProps={{span: 18}} name="media_name" label="媒体名称" rules={[{ required: true, message: '请输入媒体名称!' }]}/>
            <ProFormDigit colProps={{span: 6}} name="media_tmdb_id" label="TMDB ID"/>
            <ProFormSelect colProps={{span: 24}} name="site_rss_id" label="关联RSS" options={rss} rules={[{ required: true, message: '请选择RSS源!' }]}/>
            <ProFormText colProps={{span: 8}} name="match_title" label="匹配名称" rules={[{ required: true, message: '请输入匹配名称!' }]} placeholder="正则式"/>
            <ProFormText colProps={{span: 8}} name="match_season" label="匹配季" placeholder="正则式"/>
            <ProFormText colProps={{span: 8}} name="match_team" label="匹配制作组" placeholder="正则式"/>
            <ProFormCheckbox.Group colProps={{span: 24}} name={'include'} label={'包含'}
                                   options={['4k', '1080P', '720P', 'DV', 'HDR', 'EDR', 'HQ', '60fps']}/>
            <ProFormCheckbox.Group colProps={{span: 24}} name={'exclude'} label={'排除'}
                                   options={['4k', '1080P', '720P', 'DV', 'HDR', 'EDR', 'HQ', '60fps']}/>

        </ModalForm>
    )
}

export default ModifyModal