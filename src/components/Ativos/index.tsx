import { Button, Card, Col, Descriptions, PageHeader, Row, Statistic, Tabs, Typography } from 'antd';
import { Table } from 'antd';
import {
    EyeOutlined
  } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';

import style from './style.module.scss';
import { Content } from 'antd/lib/layout/layout';

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
            console.log(response.data)
            setAtivoDetalhe(response.data);
        })
    }, [ativoPesquisar])


    function handleClickButton(id: number) {
        setAtivoPesquisar(id);
    }
    
    const data = ativos.map(row => ({
        id: row.id,
        productimage: row.image,
        name: row.name,
        status: row.status,
        key: row.id
    }))

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            className: 'idColumn',
        },
        {
            title: '',
            dataIndex: 'image',
            key: 'image',
            render: (text: any, record: { productimage: string | undefined; }) => {
                return (
                    <img src={record.productimage} />
                );
            },
            className: 'imageColumn',
        },
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            className: 'statusColumn',
        },
        {
            title: '',
            dataIndex: 'view',
            key: 'view',
            render: (text: any, record: { key: any; }) => (
                <a href="javascript:void(0)" 
                  onClick={(e) => { handleClickButton(record.key); }}
                >
                  Ver detalhes
                </a>
            ),
        }
    ];


    const { TabPane } = Tabs;

    const renderContent = (column = 2) => (
      <Descriptions size="small" column={column}>
        <Descriptions.Item label="Created">Lili Qu</Descriptions.Item>
        <Descriptions.Item label="Association">
          <a>421421</a>
        </Descriptions.Item>
        <Descriptions.Item label="Creation Time">2017-01-10</Descriptions.Item>
        <Descriptions.Item label="Effective Time">2017-10-10</Descriptions.Item>
        <Descriptions.Item label="Remarks">
          Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
        </Descriptions.Item>
      </Descriptions>
    );
    
    const extraContent = (
      <div
        style={{
          display: 'flex',
          width: 'max-content',
          justifyContent: 'flex-end',
        }}
      >
        <Statistic
          title="Status"
          value={ativoDetalhe.status}
          style={{
            marginRight: 32,
          }}
        />
        <Statistic title="Price" prefix="$" value={568.08} />
      </div>
    );
    
    const Content = () => (
      <div className="content">
        <div className="main">{renderContent}</div>
        <div className="extra">{extraContent}</div>
      </div>
    );

    return (
        <div className={style.container}>
            <Title level={3}>Ativos</Title>

            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col className="gutter-row" span={12}>
                    <Table columns={columns} dataSource={data} />
                </Col>
                <Col className="gutter-row detalhes-ativo" span={12}>
                    <PageHeader
                        className="site-page-header-responsive"
                        title={ativoDetalhe.name}
                        subTitle="This is a subtitle"
                        extra={[
                            <img className="imagem-ativo" width="200" src={ativoDetalhe.image} alt={ativoDetalhe.name} />
                        ]}
                        footer={
                            <Tabs defaultActiveKey="1">
                                <TabPane tab="Tab 1" key="1">
                                    Content of Tab Pane 1
                                </TabPane>
                                <TabPane tab="Tab 2" key="2">
                                    Content of Tab Pane 2
                                </TabPane>
                                <TabPane tab="Tab 3" key="3">
                                    Content of Tab Pane 3
                                </TabPane>
                            </Tabs>
                        }
                    >
                        <Content></Content>
                    </PageHeader>
                    <Card key={ativoDetalhe.id}>
                        <p></p>
                        <p>{ativoDetalhe.model}</p>
                        <p>{ativoDetalhe.sensors}</p>
                        <p></p>
                        <p>{ativoDetalhe.healthscore}</p>
                    </Card>
                </Col>
            </Row>
            
        </div>
    )
}