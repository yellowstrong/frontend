import {type ActionType, ProColumns, ProTable} from "@ant-design/pro-components";
import * as api from '../../apis/subscribe.ts'
import ModifyModal from "./modifyModal.tsx";
import {Fragment, useRef, useState} from "react";
import {Button, Form} from "antd";
import {useRequest} from "ahooks";

function Subscribe() {

    const ref = useRef<ActionType>()
    const [form] = Form.useForm()
    const [openModifyModal, setOpenModifyModal] = useState(false)
    const {runAsync} = useRequest(api.get_subscribes, {manual: true})
    const {runAsync: editSubscribe} = useRequest(api.edit_subscribe, {manual: true})

    const columns: ProColumns[] = [
        {
            title: '媒体名称',
            dataIndex: 'media_name',
            fixed: 'left',
            width: 150,
            ellipsis: true
        },
        {
            title: 'TMDB ID',
            dataIndex: 'media_tmdb_id',
            width: 150,
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
                            include: record.include && record.include.split(',') || null,
                            exclude: record.exclude && record.exclude.split(',') || null
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
        values.include = values.include && values.include.join(',')
        values.exclude = values.exclude && values.exclude.join(',')
        await editSubscribe(values)
        ref.current?.reload()
        setOpenModifyModal(false)
    }

    return (
        <Fragment>
            <ProTable
                scroll={{x: 1500}}
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