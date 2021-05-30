import { Typography } from 'antd';
import { Table } from 'antd';
import { useEffect, useState } from 'react';

import { api } from '../../services/api';

import style from './style.module.scss';


const { Title } = Typography;

interface UnidadeProps {
    id: number;
    name: string;
    companyId:number;
}

export default function Unidades(){
    const [unidades, setUnidades] = useState<UnidadeProps[]>([]);
    
    useEffect(() => {
        api.get<UnidadeProps[]>(`/units`).then(response => {
            setUnidades(response.data);
        })
    }, []);

    const data = unidades.map( row => ({
        id: row.id,
        name: row.name,
        companyId: row.companyId
    }));

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            className: 'idColumn',
        },
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Empresa',
            dataIndex: 'companyId',
            key: 'companyId',
        }
    ]


    return (
        <div className={style.container}>
            <Title level={3}>Unidades</Title>

            <Table columns={columns} dataSource={data} />
        </div>
    )
}