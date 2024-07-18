import React, {useEffect, useState} from "react";
import {ProCard, ProList} from "@ant-design/pro-components";
import {useRequest} from "ahooks";
import * as api from '../../apis/dashboard.ts'
import {Col, message, Row, Space, Tag} from "antd";

function Dashboard() {

    const [schedulers, setSchedulers] = useState<any>([]);

    useEffect(() => {
        getSchedulers()
    }, [])

    const {run: getSchedulers} = useRequest(api.getSchedulers, {
        pollingInterval: 20000,
        manual: true,
        onSuccess: (res) => {
            setSchedulers(res.data.data)
        }
    })

    const {run: runJob} = useRequest(api.runScheduler, {
        manual: true,
        onSuccess: () => {
            message.success('执行成功')
            getSchedulers()
        }
    })

    return (
        <Row>
            <Col span={8}>
                <ProList
                    rowKey="id"
                    headerTitle="定时任务"
                    dataSource={schedulers}
                    showActions="hover"
                    metas={{
                        title: {dataIndex: 'name'},
                        description: {dataIndex: 'next_run'},
                        subTitle: {
                            dataIndex: 'status',
                            render: (_) => {
                                return (
                                    <Space size={0}>
                                        <Tag color="#5BD8A6">{_}</Tag>
                                    </Space>
                                );
                            },
                        },
                        actions: {
                            render: (_, row) => [
                                <a onClick={() => runJob(row.id)} key="link">立即运行</a>,
                            ],
                        },
                    }}
                />
            </Col>
        </Row>

    )
}

export default Dashboard