import { Avatar, Menu, Popover, Tooltip } from 'antd'
import { Header } from 'antd/lib/layout/layout'
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { CarryOutOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/auth';
import EmployeeService from '../../services/EmployeeService';
import './HeaderComponent.css'

/**
 * HeaderComponent
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
export const HeaderComponent = () => {

    const history = useHistory();

    const { user: currentUser } = useSelector((state: any) => state.auth);

    const [image, setImage] = useState();

    const dispatch = useDispatch();

    /**
     * Process logout
     */
    const logOut = () => {
        dispatch(logout());
        history.push("/signin");
    };

    /**
     * Menu items in header
     * @returns menus
     */
    const menu = () => {
        return (
            <React.Fragment>
                {currentUser.roles[0] === "ROLE_ADMIN" ? (
                    <Link to="/admin/employees" className="link">
                        <div className="header-sidebar">
                            Admin
                    </div>
                    </Link>
                ) : (<></>)}

                <Link to={currentUser.roles[0] === "ROLE_ADMIN" ? "/admin/profile" : "/profile"} className="link">
                    <div className="header-sidebar">
                        Profile
                        </div>
                </Link>

                <a href='/signin' onClick={logOut} className="link">
                    <div className="header-sidebar">
                        Logout
                        </div>
                </a>

            </React.Fragment>
        );
    }

    /**
     * Process load avatar
     */
    useEffect(() => {
        if (currentUser && currentUser.username) {
            EmployeeService.getEmployeeImage(currentUser.username).then((res) => {
                setImage(res.data);
            })
        }
    }, [currentUser])

    return (
        <React.Fragment>
            <Header className="header">
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1" icon={<CarryOutOutlined width={300} />} style={{ fontSize: '20px' }}>
                        <Link to='/' tabIndex={-1}>
                            Employee Management App
                        </Link>
                    </Menu.Item>

                    {
                        !currentUser ? (
                            <>

                                <Menu.Item key="3" style={{ float: "right" }}>
                                    <Link to='/signin' >
                                        Login
                                    </Link>
                                </Menu.Item>
                            </>
                        ) : (
                            <div style={{ float: "right" }}>
                                <Tooltip placement="bottomRight" title="Click me!">
                                    <Popover content={menu} trigger="click" placement="bottomRight">
                                        {
                                            image
                                                ? <Avatar size="large" src={image} />
                                                : <Avatar size="large" icon={<UserOutlined />} />
                                        }
                                    </Popover>
                                </Tooltip>
                            </div>
                        )
                    }

                </Menu>

            </Header>
        </React.Fragment >
    )
}
