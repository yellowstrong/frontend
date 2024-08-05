import {Fragment, useRef, useState} from "react";
import {Button, Form, message, Tag} from "antd";
import {type ActionType, type ProColumns, ProTable} from "@ant-design/pro-components";
import {useRequest} from "ahooks";
import * as api from '../../apis/downloader.ts'
import ModifyModal from "./modifyModal.tsx";

function Downloader() {

    const [form] = Form.useForm()
    const ref = useRef<ActionType>()
    const [openModifyModal, setOpenModifyModal] = useState<boolean>(false)

    const {runAsync} = useRequest(api.get_downloaders, {manual: true})
    const {runAsync: editDownloader} = useRequest(api.edit_downloader, {manual: true})
    const {runAsync: setDefaultDownloader} = useRequest(api.set_default_downloader, {
        manual: true,
        onSuccess: () => {
            message.success('设置成功')
            ref.current?.reload()
        }
    })


    const columns: ProColumns[] = [
        {
            title: '名称',
            dataIndex: 'name',
        },
        {
            title: '地址',
            dataIndex: 'host',
        },
        {
            title: '端口',
            dataIndex: 'port',
        },
        {
            title: '默认',
            dataIndex: 'default',
            renderText: (text: boolean, record) => {
                if (text) return (<Tag color={"green"}>是</Tag>)
                else return (<a onClick={() => setDefaultDownloader(record.id)}>设为默认</a>)
            }
        },
        {
            title: '操作',
            width: 100,
            dataIndex: 'option',
            valueType: 'option',
            key: 'option',
            render: (_, record) => [
                <a
                    key="edit"
                    onClick={() => {
                        form.setFieldsValue({
                            ...record,
                        })
                        setOpenModifyModal(true)
                    }}
                >编辑</a>,
                <a
                    key="delete"
                    onClick={() => {
                    }}
                >删除</a>
            ]
        }
    ]

    async function onFinish(values: any) {
        await editDownloader(values)
        ref.current?.reload()
        setOpenModifyModal(false)
    }

    return (
        <Fragment>
            <ProTable
                bordered
                actionRef={ref}
                columns={columns}
                request={async (params) => {
                    const res = await runAsync(params)
                    return {
                        data: res.data.data.record_list,
                        total: res.data.data.record_total,
                    }
                }}
                pagination={{pageSize: 10, showQuickJumper: true}}
                search={false}
                rowKey={"id"}
                toolBarRender={() => [
                    <Button key="add" onClick={() => setOpenModifyModal(true)} type="primary">新建</Button>
                ]}
            />
            <ModifyModal
                title={'编辑'}
                omitNil={false}
                form={form}
                open={openModifyModal}
                onOpenChange={setOpenModifyModal}
                modalProps={{
                    destroyOnClose: true,
                }}
                onFinish={onFinish}
            />
        </Fragment>
    )
}

export default Downloader