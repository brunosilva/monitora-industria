import { Layout, Menu, Breadcrumb } from 'antd';
import {
  CalculatorOutlined,
  UserOutlined,
  HomeOutlined,
  BankOutlined,
} from '@ant-design/icons';
import { useState } from 'react';

import '../../style/global.scss';
import Body from '../Body/Body';
import Ativos from '../Ativos';
import Unidades from '../Unidades';
import Empresas from '../Empresas';

const { Header, Content, Footer, Sider } = Layout;

export default function App(){
const [collapsed, setCollapsed] = useState(false);

const [selectedComponent, setSelectedComponent] = useState("");
  
const state = {
  selectedComponent,
  setSelectedComponent
}

function handleClickButton(component: string) {
  setSelectedComponent(component);
}


  return (
    <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item 
              key="1" 
              onClick={() => handleClickButton("ativos")}
              icon={<CalculatorOutlined />}>
              Ativos
            </Menu.Item>
            <Menu.Item 
              key="2" 
              onClick={() => handleClickButton("usuarios")}
              icon={<UserOutlined />}>
              Usuários
            </Menu.Item>
            <Menu.Item 
              key="3" 
              onClick={() => handleClickButton("unidades")}
              icon={<HomeOutlined />}>
              Unidades
            </Menu.Item>
            <Menu.Item 
              key="4" 
              onClick={() => handleClickButton("empresas")}
              icon={<BankOutlined />}>
              Empresas
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <Empresas />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
  )
}