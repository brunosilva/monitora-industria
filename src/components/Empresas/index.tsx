import { useEffect, useState } from 'react'
import { Button, Card, Col, Row, Statistic, Typography } from 'antd';

import { api } from '../../services/api';

import style from './style.module.scss';

const { Title } = Typography;

interface EmpresaProps {
    id: number;
    name: string;
}

interface EmpresaDetalheProps {
    id: number;
    name: string;
}

export default function Empresas(){
    const [empresas, setEmpresas] = useState<EmpresaProps[]>([]);
    const [empresasPesquisar, setUnidadesPesquisar] = useState(1);
    const [empresaDetalhe, setEmpresaDetalhe] = useState<EmpresaDetalheProps>({} as EmpresaDetalheProps);
    
    useEffect(() => {
        api.get<EmpresaProps[]>(`/companies`).then(response => {
            setEmpresas(response.data);
        })
    }, []);

    useEffect(() => {
        api.get<EmpresaDetalheProps>(`/companies/${empresasPesquisar}`).then(response => {
            setEmpresaDetalhe(response.data);
        })
    }, [empresasPesquisar])

    function handleClickButton(id: number) {
        setUnidadesPesquisar(id);
    }

    return (
        <div className={style.container}>
            <Title level={3}>Empresas</Title>

            <Row className={style.content} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col className="gutter-row" xs={24} sm={24} md={24} lg={12}>
                    <div className={style.columnCards}>
                        {empresas.map(item => (
                            <Card 
                                className={style.card}
                                key={item.id} 
                                type="inner" 
                                hoverable
                                >
                                    <Row className={style.rowInfoCard}>
                                        <Col xs={24} sm={24} md={24} lg={20}>
                                            {item.name}
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
                            <Statistic title="Id" value={empresaDetalhe.id} />
                        </Col>

                        <Col span={24}>
                            <Statistic title="Modelo" value={empresaDetalhe.name} />
                        </Col>
                    </div>
                </Col>
            </Row>
        </div>
    )

}