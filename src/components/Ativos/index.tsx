import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Alert, Button, Card, Col, Divider, Form, Image, Input, Progress, Row, Statistic, Tabs, Typography } from 'antd';
import {
    CloseOutlined,
    InfoCircleOutlined
} from '@ant-design/icons';

import { api } from '../../services/api';

import style from './style.module.scss';

const { Title } = Typography;

interface AtivosProps {
    id: number;
    status: string;
    name: string;
    image: string;
}

interface AtivosDetalhesProps {
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

const customStyles = {
    content: {
        width: '50%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

export default function Ativos() {
    const [ativos, setAtivos] = useState<AtivosProps[]>([]);
    const [ativoPesquisar, setAtivoPesquisar] = useState(1);
    const [ativoDetalhe, setAtivoDetalhe] = useState<AtivosDetalhesProps>({} as AtivosDetalhesProps);
    const [empresaInfo, setEmpresaInfo] = useState<EmpresaProds>();
    const [unidadeInfo, setUnidadeInfo] = useState<UnidadeProds>();
    const [modalIsOpen, setIsOpen] = useState(false);
    const [form] = Form.useForm();

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

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
        switch (ativoDetalhe.status) {
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

    function renderStatusCard(status: string) {
        switch (status) {
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
                                        {renderStatusCard(item.status)}
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
                    <div className={style.detalhesSection}>
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Col className="gutter-row" xs={24} sm={24} md={24} lg={24}>
                                <Row className={style.rowInfoCard}>
                                    <Col className={style.nameItem} span={12} style={{ float: 'right' }}>
                                        <Button type="primary" onClick={openModal}>Editar</Button>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row className={style.rowInfoCard}>
                                    <Modal
                                        isOpen={modalIsOpen}
                                        onRequestClose={closeModal}
                                        style={customStyles}
                                    >

                                        <CloseOutlined style={{ float: 'right' }} onClick={closeModal} />
                                        <Form
                                            layout="vertical"
                                            form={form}>
                                            <h1>Editar Ativo</h1>
                                            <strong>Id: #{ativoDetalhe.id}</strong> - {ativoDetalhe.name}
                                            <Divider />
                                            <Form.Item
                                                label="Nome"
                                                required={true}
                                            >
                                                <Input name="name" type="text" value={ativoDetalhe?.name} placeholder="Ex: Motor 123" />
                                            </Form.Item>
                                            <Form.Item
                                                label="Modelo"
                                                required={true}
                                            >
                                                <Input name="model" type="text" value={ativoDetalhe?.model} placeholder="Ex: Motor" />
                                            </Form.Item>

                                            <Form.Item
                                                label="Empresa"
                                                required={true}
                                                tooltip={{ title: 'Empresa atual', icon: <InfoCircleOutlined /> }}
                                            >
                                                <Input name="empresa" value={empresaInfo?.name} placeholder="Ex: Empresa XY Corp" />
                                            </Form.Item>
                                            <Form.Item
                                                label="Unidade"
                                                required={true}
                                                tooltip={{ title: 'Unidade atual', icon: <InfoCircleOutlined /> }}
                                            >
                                                <Input name="unidade" value={unidadeInfo?.name} placeholder="Ex: Unidade Sul" />
                                            </Form.Item>
                                            <Divider />
                                            <Button style={{ float: 'right' }} type="primary" data-testid="edit-user-button">
                                                <div className="text">Editar Ativo</div>
                                            </Button>
                                        </Form>
                                    </Modal>
                                </Row>
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
                                    <Col xs={24} sm={24} md={24} lg={9}>
                                        <Statistic title="Modelo" value={ativoDetalhe.model} />
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={9}>
                                        <Statistic title="Sensor" value={ativoDetalhe.sensors?.name} />
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={9}>
                                        {renderStatus()}
                                    </Col>
                                </Row>
                                <Row className={style.rowInfo}>
                                    <Col xs={24} sm={24} md={24} lg={12}>
                                        <Statistic title="Empresa" value={empresaInfo?.name} />
                                    </Col>

                                    <Col xs={24} sm={24} md={24} lg={12}>
                                        <Statistic title="Unidade" value={unidadeInfo?.name} />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className={style.tabsInfos}>
                            <Tabs defaultActiveKey="1" className={style.tabsContent}>
                                <TabPane tab="Especificações" key="1">
                                    <Row className={style.rowInfo}>
                                        <Col xs={24} sm={24} md={24} lg={8}>
                                            <Statistic title="Max temp" value={ativoDetalhe.specifications?.maxTemp == null ? '-' : ativoDetalhe.specifications?.maxTemp} />
                                        </Col>

                                        <Col xs={24} sm={24} md={24} lg={8}>
                                            <Statistic title="Power" value={ativoDetalhe.specifications?.power == null ? '-' : ativoDetalhe.specifications?.power} />
                                        </Col>

                                        <Col xs={24} sm={24} md={24} lg={8}>
                                            <Statistic title="RPM" value={ativoDetalhe.specifications?.rpm == null ? '-' : ativoDetalhe.specifications?.rpm} />
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tab="Métricas" key="2">
                                    <Row className={style.rowInfo}>
                                        <Col xs={24} sm={24} md={24} lg={12}>
                                            <Statistic title="Tempo de atividade" value={ativoDetalhe.metrics?.totalCollectsUptime == null ? '-' : ativoDetalhe.metrics?.totalCollectsUptime} />
                                        </Col>

                                        <Col xs={24} sm={24} md={24} lg={12}>
                                            <Statistic title="Tempo total de coleta" value={ativoDetalhe.metrics?.totalUptime == null ? '-' : ativoDetalhe.metrics?.totalUptime} />
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