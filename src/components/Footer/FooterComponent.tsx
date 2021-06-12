import React from 'react'


import { Layout } from 'antd';

const { Footer } = Layout;

/**
 * FooterComponent
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
export const FooterComponent = () => {
    return (
        <React.Fragment>
            <Footer className="footer">
                Employee Management App ©2021 Created by Thanh
            </Footer>
        </React.Fragment>
    )
}
