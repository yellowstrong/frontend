import {ProColumns, ProTable} from "@ant-design/pro-components";
import * as api from '../../apis/subscribe.ts'
import ModifyModal from "./modifyModal.tsx";
import {Fragment, useState} from "react";
import {Button, Form} from "antd";

function Subscribe() {

    const [openModifyModal, setOpenModifyModal] = useState(false);
    const [form] = Form.useForm();

    const columns: ProColumns[] = [
        {
            title: '订阅名称',
            dataIndex: 'name',
        },
        {
            title: '关联rss',
            dataIndex: ['rss','alias'],
        },
        {
            title: '最后更新',
            dataIndex: ['rss','latest_pub'],
        },
        {
            title: '匹配名称',
            dataIndex: 'match_title',
        },
        {
            title: '匹配季',
            dataIndex: 'match_season',
        },
        {
            title: '匹配制作组',
            dataIndex: 'match_team',
        },
        {
            title: '包含',
            dataIndex: 'include',
        },
        {
            title: '排除',
            dataIndex: 'exclude',
        },
        {
            title: '下载路径',
            dataIndex: 'download_path',
        },
        {
            title: '转移路径',
            dataIndex: 'transfer_path',
        },
        {
            title: '状态',
            dataIndex: 'status',
            valueEnum: {
                true: { text: '进行中', status: 'Processing' },
                false: { text: '已停止', status: 'Error' },
            }
        },
        {
            title: '操作',
            valueType: 'option',
            key: 'option',
            render: (_, record) => [
                <a
                    key="edit"
                    onClick={() => {
                        form.setFieldsValue({
                            ...record,
                            include: record.include.split(','),
                            exclude: record.exclude.split(',')
                        })
                        setOpenModifyModal(true)
                    }}
                >编辑</a>,
                <a
                    key="detail"
                    onClick={() => {
                    }}
                >查看详情</a>,
                <a
                    key="delete"
                    onClick={() => {
                    }}
                >删除</a>
            ]
        }
    ]

    async function submit(values: any) {
        debugger
    }

    return (
        <Fragment>
            <ProTable
                cardBordered
                columns={columns}
                request={async (params) => {
                    const res = await api.get_subscribes({
                        page: params.current,
                        page_size: params.pageSize,
                    })
                    return {
                        data: res.data.data.record_list,
                        success: res.data.code === 200,
                        total: res.data.data.record_total,
                    };
                }}
                columnsState={{
                    persistenceKey: 'pro-table-singe-demos',
                    persistenceType: 'localStorage',
                    defaultValue: {
                        option: {fixed: 'right', disable: true},
                    },
                    onChange(value) {
                        console.log('value: ', value);
                    },
                }}
                pagination={{
                    pageSize: 5,
                }}
                columnEmptyText={'-'}
                search={{}}
                rowKey={"id"}
                toolBarRender={() => [
                    <Button
                        key="add"
                        onClick={() => setOpenModifyModal(true)}
                        type="primary"
                    >
                        新建
                    </Button>
                ]}
            />
            <ModifyModal
                title={'编辑'}
                open={openModifyModal}
                onOpenChange={setOpenModifyModal}
                form={form}
                modalProps={{
                    destroyOnClose: true,
                }}
                onFinish={submit}
            />
        </Fragment>
    )
}

export default Subscribe