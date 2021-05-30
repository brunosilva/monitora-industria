import { Typography } from 'antd';
import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';

import style from './style.module.scss';

const { Title } = Typography;

interface UsuarioProps {
    id: number;
    email: string;
    name: string;
    unitId: number;
    companyId: number;
}

export default function Usuarios(){
    const [usuarios, setUsuarios] = useState<UsuarioProps[]>([]);

    useEffect(() => {
        api.get<UsuarioProps[]>('/users').then(response => {
            setUsuarios(response.data);
        })
    });

    
    const data = usuarios.map(row => ({
        id: row.id,
        email: row.email,
        name: row.name,
        unitId: row.unitId,
        companyId: row.companyId
    }))

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'E-mail',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Unidade',
            dataIndex: 'unitId',
            key: 'unitId',
        },
        {
            title: 'Empresa',
            dataIndex: 'companyId',
            key: 'companyId',
        }
    ];

    return (
        <div className={style.container}>
            <Title level={3}>Usuários</Title>

            <Table columns={columns} dataSource={data} />
        </div>
    )
}