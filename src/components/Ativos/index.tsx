import { Typography } from 'antd';
import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';

import style from './style.module.scss';

const { Title } = Typography;

interface AtivosProps {
    id: number;
    sensors: Array<{
        name: string
    }>;
    model: string;
    status: string;
    healthscore: number;
    name: string;
    image: string;
    specifications: Array<{
        maxTemp: number;
        power: number;
        rpm: number;
    }>;
    metrics: Array<{
        totalCollectsUptime: number;
        totalUptime: number;
        lastUptimeAt: Date;
    }>;
    unitId: number;
    companyId: number;
}


export default function Ativos() {
    const [ativos, setAtivos] = useState<AtivosProps[]>([]);

    useEffect(() => {
        api.get<AtivosProps[]>(`/assets`).then(response => {
            setAtivos(response.data);
        })
    }, []);

    const data = ativos.map(row => ({
        id: row.id,
        sensors: row.sensors,
        productimage: row.image,
        name: row.name,
        model: row.model,
        status: row.status,
        healthscore: row.healthscore
    }))

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            className: 'idColumn',
        },
        {
            title: 'Sensor',
            dataIndex: 'sensors',
            key: 'sensors',
            className: 'sensorColumn',
        },
        {
            title: '',
            dataIndex: 'image',
            key: 'image',
            render: (text: any, record: { productimage: string | undefined; }) => {
                return (
                    <img src={record.productimage} />
                );
            },
            className: 'imageColumn',
        },
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Model',
            dataIndex: 'model',
            key: 'model',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            className: 'statusColumn',
        },
        {
            title: 'Healthscore',
            key: 'healthscore',
            dataIndex: 'healthscore',
            className: 'healthColumn',
        }
    ];



    return (
        <div className={style.container}>
            <Title level={3}>Ativos</Title>

            <Table columns={columns} dataSource={data} />
        </div>
    )
}