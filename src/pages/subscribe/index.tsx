import {ProColumns, ProTable} from "@ant-design/pro-components";
import * as api from '../../apis/subscribe.ts'
import ModifyModal from "./modifyModal.tsx";
import {Fragment, useState} from "react";
import {Button, Form} from "antd";
import {useRequest} from "ahooks";

function Subscribe() {

    const [openModifyModal, setOpenModifyModal] = useState(false);
    const [form] = Form.useForm();

    const {runAsync} = useRequest(api.get_subscribes, {manual: true})

    const columns: ProColumns[] = [
        {
            title: '订阅名称',
            dataIndex: 'name',
            fixed: 'left',
            width:150,
            ellipsis: true
        },
        {
            title: '关联rss',
            dataIndex: ['rss', 'alias'],
            ellipsis: true,
        },
        {
            title: '最后更新',
            dataIndex: ['rss', 'latest_pub'],
            ellipsis: true,
            valueType: 'dateTime'
        },
        {
            title: '匹配名称',
            dataIndex: 'match_title',
            ellipsis: true,
        },
        {
            title: '匹配季',
            dataIndex: 'match_season',
            ellipsis: true,
        },
        {
            title: '匹配制作组',
            dataIndex: 'match_team',
            ellipsis: true,
        },
        {
            title: '包含',
            dataIndex: 'include',
            ellipsis: true,
        },
        {
            title: '排除',
            dataIndex: 'exclude',
            ellipsis: true,
        },
        {
            title: '下载路径',
            dataIndex: 'download_path',
            ellipsis: true,
        },
        {
            title: '转移路径',
            dataIndex: 'transfer_path',
            ellipsis: true,
        },
        {
            title: '状态',
            width: 100,
            dataIndex: 'status',
            fixed: 'right',
            ellipsis: true,
            valueEnum: {
                true: {text: '进行中', status: 'Processing'},
                false: {text: '已停止', status: 'Error'},
            }
        },
        {
            title: '操作',
            width: 150,
            valueType: 'option',
            key: 'option',
            fixed: 'right',
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
                scroll={{x:1500}}
                bordered
                columns={columns}
                request={async (params) => {
                    const res = await runAsync(params)
                    return {
                        data: res.data.data.record_list,
                        total: res.data.data.record_total,
                    }
                }}
                pagination={{pageSize: 5}}
                search={false}
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