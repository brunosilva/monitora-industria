import { Button, Card, Col, Row, Statistic, Typography } from 'antd';
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

interface UsuarioDetalheProps {
    id: number;
    name: string;
    email: string;
}

interface EmpresaProds {
    id: number;
    name: string;
}

interface UnidadeProds {
    id: number;
    name: string;
}

export default function Usuarios(){
    const [usuarios, setUsuarios] = useState<UsuarioProps[]>([]);
    const [usuarioPesquisar, setUsuarioPesquisar] = useState(1);
    const [usuarioDetalhe, setUsuarioDetalhe] = useState<UsuarioDetalheProps>({} as UsuarioDetalheProps);
    const [empresaInfo, setEmpresaInfo] = useState<EmpresaProds>();
    const [unidadeInfo, setUnidadeInfo] = useState<UnidadeProds>();

    useEffect(() => {
        api.get<UsuarioProps[]>('/users').then(response => {
            setUsuarios(response.data);
        })
    });

    useEffect(() => {
        api.get<UsuarioDetalheProps>(`/users/${usuarioPesquisar}`).then(response => {
            setUsuarioDetalhe(response.data);
        })
                
        api.get<EmpresaProds>(`/companies/${usuarioPesquisar}`).then(response => {
            setEmpresaInfo(response.data);
        })

        api.get<UnidadeProds>(`/units/${usuarioPesquisar}`).then(response => {
            setUnidadeInfo(response.data);
        })
    }, [usuarioPesquisar])

    function handleClickButton(id: number) {
        setUsuarioPesquisar(id);
    }

    return (
        <div className={style.container}>
            <Title level={3}>Usuários</Title>


            <Row className={style.content} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col className="gutter-row" xs={24} sm={24} md={24} lg={12}>
                    <div className={style.columnCards}>
                        {usuarios.map(item => (
                            <Card 
                                className={style.card}
                                key={item.id} 
                                type="inner" 
                                hoverable
                                >
                                    <Row className={style.rowInfoCard}>
                                        <Col xs={24} sm={24} md={24} lg={10}>
                                            {item.name}
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={10}>
                                            {item.email}
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={4}>
                                            <Button type="primary" onClick={(e) => handleClickButton(item.id)}>Ver detalhes</Button>
                                        </Col>
                                    </Row>
                            </Card>
                        ))}
                    </div>
                </Col>
                <Col className="gutter-row" xs={24} sm={24} md={24} lg={12}>
                    <div className={style.detalhesAtivo}>
                        <Col className={style.nameItem} span={24}>
                            <Statistic title="Id" value={usuarioDetalhe.id} />
                        </Col>

                        <Col span={24}>
                            <Statistic title="Nome" value={usuarioDetalhe.name} />
                        </Col>

                        <Col span={24}>
                            <Statistic title="Email" value={usuarioDetalhe.email} />
                        </Col>
                
                        <Col span={24}>
                            <Statistic title="Empresa" value={empresaInfo?.name} />
                        </Col>
                        
                        <Col span={24}>
                            <Statistic title="Unidade" value={unidadeInfo?.name} />
                        </Col>
                    </div>
                </Col>
            </Row>
        </div>
    )
}