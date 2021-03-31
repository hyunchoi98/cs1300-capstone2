import React, { Component } from "react";
import Navbar from './Navbar.js';

import { Layout, Button, Typography } from 'antd';
const { Title } = Typography;
const { Header, Footer, Sider, Content } = Layout;


function Home() {
  return (
    <Layout>
      <Header>
        <Navbar></Navbar>
      </Header>
      <Content>
        <div
          style={{
            height: '90vh',
            backgroundSize: "cover",
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            backgroundSize: '100% 100%',
          }}>
          <div style={{ height: '90vh', backdropFilter: 'blur(1px)' }}>

            <div className="break"></div>
            <div className="Iam" >
              <p className="m-hero"></p>
            </div>
            <div className="m-subhero" style={{ textAlign: 'left', width: '80vw', margin: 'auto', backdropFilter: 'blur(2px)' }}>
              <Title className="m-subhero" level={2}>Find the perfect credit card for you!</Title>
            </div>
          </div>
        </div>
      </Content>
    </Layout >

  );
}

export default Home;
