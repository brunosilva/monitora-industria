import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DashboardOutlined,
  CalculatorOutlined,
  UserOutlined,
  HomeOutlined,
  BankOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import Body from '../components/Body/Body';
import Ativos from '../components/Ativos';
import Unidades from '../components/Unidades';
import Empresas from '../components/Empresas';
import Usuarios from '../components/Usuarios';

import '../style/global.scss';

const { Header, Content, Footer, Sider } = Layout;

export default function App(){
  const [collapsed, setCollapsed] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState('dashboard');
  
function handleClickButton(component: string) {
  setSelectedComponent(component);
}

function renderSwitchComponent() {
  switch(selectedComponent) {
    case 'ativos':
      return <Ativos />;
    case 'usuarios':
      return <Usuarios />;
    case 'unidades':
      return <Unidades />;
    case 'empresas':
      return <Empresas />;
    default:
      return <Body />;
  }
}

  return (
    <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item 
              key="1" 
              onClick={(e) => handleClickButton("dashboard")}
              icon={<DashboardOutlined />}>
              Dashboard
            </Menu.Item>
            <Menu.Item 
              key="2" 
              onClick={(e) => handleClickButton("ativos")}
              icon={<CalculatorOutlined />}>
              Ativos
            </Menu.Item>
            <Menu.Item 
              key="3" 
              onClick={(e) => handleClickButton("usuarios")}
              icon={<UserOutlined />}>
              Usuários
            </Menu.Item>
            <Menu.Item 
              key="4" 
              onClick={(e) => handleClickButton("unidades")}
              icon={<HomeOutlined />}>
              Unidades
            </Menu.Item>
            <Menu.Item 
              key="5" 
              onClick={(e) => handleClickButton("empresas")}
              icon={<BankOutlined />}>
              Empresas
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>home</Breadcrumb.Item>
              <Breadcrumb.Item>{selectedComponent}</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              {renderSwitchComponent()}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}><a href="https://www.linkedin.com/in/bruno-silva0109/" target="_blank">Bruno Silva</a> ©2021</Footer>
        </Layout>
      </Layout>
  )
}