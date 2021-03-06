import { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Statistic, Typography } from 'antd';

import { api } from '../../services/api';

import style from './style.module.scss';

const { Title } = Typography;

interface UnidadeProps {
    id: number;
    name: string;
    companyId:number;
}

interface UnidadeDetalheProps {
    id: number;
    name: string;
}

export default function Unidades(){
    const [unidades, setUnidades] = useState<UnidadeProps[]>([]);
    const [unidadesPesquisar, setUnidadesPesquisar] = useState(1);
    const [unidadeDetalhe, setUnidadeDetalhe] = useState<UnidadeDetalheProps>({} as UnidadeDetalheProps);
    
    useEffect(() => {
        api.get<UnidadeProps[]>(`/units`).then(response => {
            setUnidades(response.data);
        })
    }, []);
    
    useEffect(() => {
        api.get<UnidadeDetalheProps>(`/units/${unidadesPesquisar}`).then(response => {
            setUnidadeDetalhe(response.data);
        })
    }, [unidadesPesquisar])

    function handleClickButton(id: number) {
        setUnidadesPesquisar(id);
    }

    return (
        <div className={style.container}>
            <Title level={3}>Unidades</Title>

            <Row className={style.content} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col className="gutter-row" xs={24} sm={24} md={24} lg={12}>
                    <div className={style.columnCards}>
                        {unidades.map(item => (
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
                            <Statistic title="Id" value={unidadeDetalhe.id} />
                        </Col>

                        <Col span={24}>
                            <Statistic title="Unidade" value={unidadeDetalhe.name} />
                        </Col>

                    </div>
                </Col>
            </Row>
        </div>
    )
}