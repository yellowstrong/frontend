import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {ProTable} from '@ant-design/pro-components';
import {Button, Form} from 'antd';

import * as api from "../../apis/site.ts";
import {useRequest} from "ahooks";
import {Fragment, useRef, useState} from "react";
import ModifyModal from "./modifyModal.tsx";

function Site() {

    const ref = useRef<ActionType>()
    const [form] = Form.useForm()
    const [openModifyModal, setOpenModifyModal] = useState(false)
    const {runAsync} = useRequest(api.get_sites, {manual: true})
    const {runAsync: editSite} = useRequest(api.edit_site, {manual: true})

    const columns: ProColumns[] = [
        {
            title: '站点名称',
            width: 100,
            dataIndex: 'name',
        },
        {
            title: 'URL',
            width: 200,
            dataIndex: 'url',
            ellipsis: true,
        },
        {
            title: 'Cookie',
            width: 400,
            dataIndex: 'cookie',
            ellipsis: true,
            copyable: true
        },
        {
            title: '超时时间',
            width: 80,
            dataIndex: 'time_out',
        },
        {
            title: 'UA',
            dataIndex: 'user_agent',
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

    function expandedRowRender(value: any) {

        const columns: ProColumns[] = [
            {
                title: '别名',
                width: 150,
                dataIndex: 'alias',
                ellipsis: true,
            },
            {
                title: 'URL',
                dataIndex: 'url',
                ellipsis: true
            },
            {
                title: '最近更新',
                width: 200,
                dataIndex: 'latest_pub',
                ellipsis: true,
                valueType: 'dateTime'
            }
        ]
        return (
            <ProTable
                bordered
                columns={columns}
                headerTitle={false}
                search={false}
                options={false}
                dataSource={value.site_rss}
                pagination={false}
            />
        )
    }

    async function onFinish(values: any) {
        await editSite(values)
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
                expandable={{expandedRowRender}}
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

    );
}

export default Site