import { useEffect, useState } from 'react';
import { Card, Col, Image, Progress, Row, Statistic, Tabs, Typography } from 'antd';

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
    const [ativoPesquisar, setAtivoPesquisar] = useState(1);
    const [ativoDetalhe, setAtivoDetalhe] = useState<AtivosDetalhesProps>({} as AtivosDetalhesProps);

    useEffect(() => {
        api.get<AtivosProps[]>(`/assets`).then(response => {
            setAtivos(response.data);
        })
    }, []);

    useEffect(() => {
        api.get<AtivosDetalhesProps>(`/assets/${ativoPesquisar}`).then(response => {
            console.log(response.data.metrics);
            setAtivoDetalhe(response.data);
        })
    }, [ativoPesquisar])


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
                <Col className="gutter-row" span={12}>
                    <div className={style.columnCards}>
                        {ativos.map(item => (
                            <Card 
                                className={style.card}
                                key={item.id} 
                                type="inner" 
                                hoverable
                                >
                                    <Row>
                                        <Col span={4}>
                                            <Image
                                                width={80}
                                                src={item.image}
                                                alt={item.name}
                                            />
                                        </Col>
                                        <Col span={8}>
                                            {item.name}
                                        </Col>
                                        <Col span={8}>
                                            {item.status}
                                        </Col>
                                        <Col span={4}>
                                            <a onClick={(e) => handleClickButton(item.id)} >Ver detalhes</a>
                                        </Col>
                                    </Row>
                            </Card>
                        ))}
                    </div>
                </Col>
                <Col className="gutter-row" span={12}>
                    <div className={style.detalhesAtivo}>
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Col className="gutter-row" span={12}>
                                <Row className={style.rowInfo}>
                                    <Col span={12}>
                                        <Statistic title="Nome" value={ativoDetalhe.name} />
                                    </Col>
                                    <Col span={12}>
                                        <Progress type="circle" percent={ativoDetalhe.healthscore} />
                                    </Col>
                                    
                                </Row>
                                <Row className={style.rowInfo}>
                                    <Col span={12}>
                                        <Statistic title="Status" value={ativoDetalhe.status} />
                                    </Col>
                                    <Col span={12}>
                                        <Statistic title="Modelo" value={ativoDetalhe.model} />
                                    </Col>
                                </Row>
                            </Col>
                            <Col className="gutter-row" span={12}>
                                <ImageDetalhe />
                            </Col>
                        </Row>
                        <Row className="tabs-infos">
                            <Tabs defaultActiveKey="1">
                                <TabPane tab="Especificações" key="1">
                                    <Row>
                                        <Col span={24}>
                                            <span className="title">Temperatura maxima</span>
                                            {/* <strong className="info">{ativoDetalhe.specifications.map(elem => (
                                                <Statistic title="maxTemp" value={elem.maxTemp} />
                                            ))}</strong> */}
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tab="Métricas" key="2">
                                    <Row gutter={2}>
                                        {/* <Col span={8}>
                                            <span className="title">totalCollectsUptime</span>
                                            <strong className="info">{ativoDetalhe.metrics[0]}</strong>
                                        </Col>
                                        <Col span={8}>
                                            <span className="title">totalUptime</span>
                                            <strong className="info">{ativoDetalhe.metrics[1]}</strong>
                                        </Col>
                                        <Col span={8}>
                                            <span className="title">lastUptimeAt</span>
                                            <strong className="info">{ativoDetalhe.metrics[2]}</strong>
                                        </Col> */}
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