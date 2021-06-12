import React from 'react';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import { HeaderComponent } from '../../components/Header/HeaderComponent';
import { SideBar } from '../../components/SideBar/SideBar';
import { FooterComponent } from '../../components/Footer/FooterComponent';

const { Content, Sider } = Layout;

/**
 * MainDashboard
 * <p>
 * Version 1.0
 * <p>
 * Date: 30-05-2021
 * <p>
 * Copyright By Thanh
 * <p>
 * Modification Logs:
 * DATE             AUTHOR              DESCRIPTION
 * -------------------------------------------------
 * 07-06-2021       ThanhBT11           Create
 */
const MainDashboard = (props: any) => {

    return (
        <Layout>
            <HeaderComponent />
            <Content >
                <Layout className="site-layout-background">

                    <Sider className="site-layout-background" style={{  minHeight: "100vh"}} width="13%">
                        <SideBar />
                    </Sider>

                    <Content style={{ padding: '24px', minHeight: "100vh"}}>
                        {props.children}
                    </Content>
                </Layout>
            </Content>
            <FooterComponent />

        </Layout>
    );
}

export default MainDashboard;
