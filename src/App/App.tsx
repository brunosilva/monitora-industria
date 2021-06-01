import { Layout, Menu, Breadcrumb } from 'antd';
import {
  CalculatorOutlined,
  UserOutlined,
  HomeOutlined,
  BankOutlined,
} from '@ant-design/icons';
import { useState } from 'react';

import '../style/global.scss';
import Body from '../components/Body/Body';
import Ativos from '../components/Ativos';
import Unidades from '../components/Unidades';
import Empresas from '../components/Empresas';
import Usuarios from '../components/Usuarios';

const { Header, Content, Footer, Sider } = Layout;

export default function App(){
const [collapsed, setCollapsed] = useState(false);
//const [screenMonitor, setScreenMonitor] = useState('Body');

const [selectedComponent, setSelectedComponent] = useState('');
  
const state = {
  selectedComponent,
  setSelectedComponent
}

function handleClickButton(component: string) {
  setSelectedComponent(component);
  //setScreenMonitor(component);
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
              <Unidades />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}><a href="https://www.linkedin.com/in/bruno-silva0109/" target="_blank">Bruno Silva</a> ©2021</Footer>
        </Layout>
      </Layout>
  )
}