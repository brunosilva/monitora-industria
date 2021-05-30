import { Typography } from 'antd';
import { Table } from 'antd';
import { useEffect, useState } from 'react'
import { api } from '../../services/api';

import style from './style.module.scss';

const { Title } = Typography;

interface EmpresaProps {
    id: string;
    name: string;
}

export default function Empresas(){
    const [empresas, setEmpresas] = useState<EmpresaProps[]>([]);

    useEffect(() => {
        api.get<EmpresaProps[]>(`/companies`).then(response => {
            setEmpresas(response.data);
        })
    }, []);


    const data = empresas.map(row => ({
        id: row.id,
        name: row.name
    }))

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
        }
    ];

    return (
        <div className={style.container}>
            <Title level={3}>Empresas</Title>

            <Table columns={columns} dataSource={data} />
        </div>
    )

}