import React from 'react'
import './PageNotFound.css';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

/**
 * PageNotFoundComponent
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
export const PageNotFoundComponent = () => {
    return (
        <div>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Link to='/'><Button type="primary">Back Home</Button></Link>}
            />
        </div>
    )
}
