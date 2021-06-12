import React from 'react'
import { Layout, Result } from 'antd'
import { SmileOutlined } from '@ant-design/icons';
import { HeaderComponent } from '../components/Header/HeaderComponent';
import { Content } from 'antd/lib/layout/layout';
import { FooterComponent } from '../components/Footer/FooterComponent';

/**
 * HomePage
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
export const HomePage = () => {

    return (
        <Layout>
            <HeaderComponent />
            <Layout className="site-layout-background" >
                <Content style={{ padding: ' 24px', minHeight: "100vh" }}>
                    <Result
                        icon={<SmileOutlined />}
                        title="Welcome to Employees Management App!" />
                </Content>
            </Layout>
            <FooterComponent />
        </Layout>
    )
}
