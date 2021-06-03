import { Button, Card, Col, Divider, Form, Input, Row, Statistic, Typography } from 'antd';
import {
    CloseOutlined,
    InfoCircleOutlined
  } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
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

const customStyles = {
    content : {
        width                 : '50%',
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
  };

  
export default function Usuarios(){
    const [usuarios, setUsuarios] = useState<UsuarioProps[]>([]);
    const [usuarioPesquisar, setUsuarioPesquisar] = useState(1);
    const [usuarioDetalhe, setUsuarioDetalhe] = useState<UsuarioDetalheProps>({} as UsuarioDetalheProps);
    const [empresaInfo, setEmpresaInfo] = useState<EmpresaProds>();
    const [unidadeInfo, setUnidadeInfo] = useState<UnidadeProds>();
    const [modalIsOpen,setIsOpen] = useState(false);
    const [form] = Form.useForm();

    function openModal() {
      setIsOpen(true);
    }
  
    function closeModal(){
      setIsOpen(false);
    }

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
                        <Row className={style.rowInfoCard}>
                            <Col className={style.nameItem} span={12}>
                                <Statistic title="Id" value={usuarioDetalhe.id} />
                            </Col>
                            <Col className={style.nameItem} span={12}>
                                <Button type="primary" onClick={openModal}>Editar</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Modal
                                isOpen={modalIsOpen}
                                onRequestClose={closeModal}
                                style={customStyles}
                            >

                                <CloseOutlined style={{float: 'right'}} onClick={closeModal}/>
                                <Form 
                                    layout="vertical" 
                                    form={form}>
                                    <h1>Editar Usuário</h1>
                                    <strong>Id: #{usuarioDetalhe.id}</strong> - {usuarioDetalhe.name}
                                    <Divider />
                                    <Form.Item
                                        label="Nome"
                                        required={true}
                                    >
                                        <Input name="name" value={usuarioDetalhe.name} placeholder="Ex: Testador Um" />
                                    </Form.Item>
                                    <Form.Item
                                        label="E-mail"
                                        required={true}
                                    >
                                        <Input name="email" value={usuarioDetalhe.email} placeholder="Ex: teste1@traction.com" />
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
                                    <Button style={{float: 'right'}} type="primary" data-testid="edit-user-button">
                                        <div className="text">Editar usuário</div>
                                    </Button>
                                </Form>
                            </Modal>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Statistic title="Nome" value={usuarioDetalhe.name} />
                            </Col>

                            <Col span={24}>
                                <Statistic title="E-mail" value={usuarioDetalhe.email} />
                            </Col>
                    
                            <Col span={24}>
                                <Statistic title="Empresa" value={empresaInfo?.name} />
                            </Col>
                            
                            <Col span={24}>
                                <Statistic title="Unidade" value={unidadeInfo?.name} />
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>
    )
}