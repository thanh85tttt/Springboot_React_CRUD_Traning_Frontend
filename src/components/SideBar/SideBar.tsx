import { Menu } from 'antd'
import SubMenu from 'antd/lib/menu/SubMenu'
import React from 'react'
import { UserOutlined, AuditOutlined, HomeOutlined, LayoutOutlined, DollarCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

/**
 * SideBar
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
export const SideBar = () => {
    return (
        <React.Fragment>
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
                theme="dark"
            >

                <Menu.Item key="1" icon={<HomeOutlined />} tabIndex={1}>
                    <Link to='/' tabIndex={1}>Home</Link>
                </Menu.Item>

                <SubMenu key="sub1" icon={<UserOutlined />} title="Employees" >
                    <Menu.Item key="2" tabIndex={2}>
                        <Link to='/admin/employees' tabIndex={2}>List Employees</Link>
                    </Menu.Item>
                    <Menu.Item key="3" tabIndex={3}>
                        <Link to='/admin/employees/role-and-department' tabIndex={3}>
                            Roles and Departments
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="4" tabIndex={4}>
                        <Link to='/admin/employees/add' tabIndex={4}>Add Employee</Link>
                    </Menu.Item>
                </SubMenu>

                <SubMenu key="sub2" icon={<AuditOutlined />} title="Roles">
                    <Menu.Item key="5" tabIndex={5}>
                        <Link to='/admin/roles' tabIndex={5}>
                            List Roles
                        </Link>
                    </Menu.Item>

                    <Menu.Item key="6" tabIndex={6}>
                        <Link to='/admin/roles/add' tabIndex={6}>
                            Add Role
                        </Link>
                    </Menu.Item>
                </SubMenu>

                <SubMenu key="sub3" icon={<LayoutOutlined />} title="Departments">
                    <Menu.Item key="7" tabIndex={7}>
                        <Link to='/admin/departments' tabIndex={7}>
                            List Departments
                        </Link>
                    </Menu.Item>

                    <Menu.Item key="8" tabIndex={8}>
                        <Link to='/admin/departments/add' tabIndex={8}>
                            Add Departments
                        </Link>
                    </Menu.Item>
                </SubMenu>

                <SubMenu key="sub4" icon={<DollarCircleOutlined />} title="Salaries">
                    <Menu.Item key="9" tabIndex={9}>
                        <Link to='/admin/salary' tabIndex={9}>  
                            List Salaries
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="10" tabIndex={10}>
                        <Link to='/admin/salary/add' tabIndex={10}>
                            Add New Salary
                        </Link>
                    </Menu.Item>
                
                </SubMenu>

            </Menu>
        </React.Fragment>
    )
}
