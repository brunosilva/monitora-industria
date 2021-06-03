import { Alert, Button, Card, Col, Image, Progress, Row, Statistic, Tabs, Typography } from 'antd';
import { useEffect, useState } from 'react';

import { api } from '../../services/api';

import style from './style.module.scss';

const { Title } = Typography;

interface AtivosProps {
    id: number;
    status: string;
    name: string;
    image: string;
}

interface AtivosDetalhesProps{
    id: number;
    sensors: {
        name: string
    };
    model: string;
    status: string;
    healthscore: number;
    name: string;
    image: string;
    specifications: {
        maxTemp: number;
        power: number;
        rpm: number;
    };
    metrics: {
        totalCollectsUptime: number;
        totalUptime: number;
        lastUptimeAt?: Date;
    };
    unitId: number;
    companyId: number;
}

interface EmpresaProds {
    id: number;
    name: string;
}

interface UnidadeProds {
    id: number;
    name: string;
}

export default function Ativos() {
    const [ativos, setAtivos] = useState<AtivosProps[]>([]);
    const [ativoPesquisar, setAtivoPesquisar] = useState(1);
    const [ativoDetalhe, setAtivoDetalhe] = useState<AtivosDetalhesProps>({} as AtivosDetalhesProps);
    const [empresaInfo, setEmpresaInfo] = useState<EmpresaProds>();
    const [unidadeInfo, setUnidadeInfo] = useState<UnidadeProds>();
      
    useEffect(() => {
        api.get<AtivosProps[]>(`/assets`).then(response => {
            setAtivos(response.data);
        })
    }, []);

    useEffect(() => {
        api.get<AtivosDetalhesProps>(`/assets/${ativoPesquisar}`).then(response => {
            setAtivoDetalhe(response.data);
        })

        api.get<EmpresaProds>(`/companies/${ativoPesquisar}`).then(response => {
            setEmpresaInfo(response.data);
        })

        api.get<UnidadeProds>(`/units/${ativoPesquisar}`).then(response => {
            setUnidadeInfo(response.data);
        })
    }, [ativoPesquisar])

    function renderStatus() {
        switch(ativoDetalhe.status) {
            case 'inAlert':
                return <Alert message="Em Alerta" type="warning" />;
            case 'inOperation':
                return <Alert message="Em Operação" type="success" />;
            case 'inDowntime':
                return <Alert message="Em Parada" type="error" />;
            default:
                return '';
        }
    };

    function handleClickButton(id: number) {
        setAtivoPesquisar(id);
    }

    function ImageDetalhe() {
        return (
            <Image
                width={200}
                src={ativoDetalhe.image}
                alt={ativoDetalhe.name}
            />
        );
    }

    const { TabPane } = Tabs;

    return (
        <div className={style.container}>
            <Title level={3}>Ativos</Title>

            <Row className={style.content} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col className="gutter-row" xs={24} sm={24} md={24} lg={12}>
                    <div className={style.overflowY}>
                        {ativos.map(item => (
                            <Card 
                                className={style.card}
                                key={item.id} 
                                type="inner" 
                                hoverable
                                >
                                    <Row className={style.rowInfoCard}>
                                        <Col xs={24} sm={24} md={24} lg={4}>
                                            <Image
                                                width={50}
                                                src={item.image}
                                                alt={item.name}
                                            />
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={11}>
                                            {item.name}
                                        </Col>
                                        <Col xs={24} sm={24} md={24} lg={5}>
                                            {item.status}
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
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Col className="gutter-row" xs={24} sm={24} md={24} lg={24}>
                                <Row className={style.rowInfo}>
                                    <Col className={style.nameItem} xs={24} sm={24} md={24} lg={9}>
                                        <Statistic title="Nome / Healthscore / Foto" value={ativoDetalhe.name} />
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={6}>
                                        <Progress 
                                            strokeColor={{
                                                '0%': '#108ee9',
                                                '60%': '#FFA500',
                                                '100%': '#FF0000',
                                            }}
                                            type="circle" 
                                            percent={ativoDetalhe.healthscore} />
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={9}>
                                        <ImageDetalhe />
                                    </Col>
                                </Row>
                                <Row className={style.rowInfo}>
                                    <Col span={9}>
                                        <Statistic title="Modelo" value={ativoDetalhe.model} />
                                    </Col>
                                    <Col span={9}>
                                        <Statistic title="Sensor" value={ativoDetalhe.sensors?.name} />
                                    </Col>
                                    <Col span={6}>
                                        {renderStatus()}
                                    </Col>
                                </Row>
                                <Row className={style.rowInfo}>
                                    <Col span={12}>
                                        <Statistic title="Empresa" value={empresaInfo?.name} />
                                    </Col>

                                    <Col span={12}>
                                        <Statistic title="Unidade" value={unidadeInfo?.name} />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="tabs-infos">
                            <Tabs defaultActiveKey="1">
                                <TabPane tab="Especificações" key="1">
                                    <Row className={style.rowInfo}>
                                        <Col span={24}>
                                            <Statistic title="Max temp" value={ativoDetalhe.specifications?.maxTemp} />
                                        </Col>
                                    </Row>
                                    <Row className={style.rowInfo}>
                                        <Col span={24}>
                                            <Statistic title="Power" value={ativoDetalhe.specifications?.power} />
                                        </Col>
                                    </Row>
                                    <Row className={style.rowInfo}>
                                        <Col span={24}>
                                            <Statistic title="RPM" value={ativoDetalhe.specifications?.rpm} />
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tab="Métricas" key="2">
                                    <Row className={style.rowInfo}>
                                        <Col span={24}>
                                            <Statistic title="Tempo de atividade" value={ativoDetalhe.metrics?.totalCollectsUptime} />
                                        </Col>
                                    </Row>
                                    <Row className={style.rowInfo}>
                                        <Col span={24}>
                                            <Statistic title="Tempo total de coleta" value={ativoDetalhe.metrics?.totalUptime} />
                                        </Col>
                                    </Row>
                                </TabPane>
                            </Tabs>
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>
    )
}