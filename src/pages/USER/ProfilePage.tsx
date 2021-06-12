import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Modal, Descriptions, Avatar, Button, Tooltip, Layout } from 'antd';
import EmployeeService from '../../services/EmployeeService';
import { AxiosError } from 'axios';
import { useSelector } from 'react-redux';
import { EditOutlined, ContainerOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { HeaderComponent } from '../../components/Header/HeaderComponent';
import { Content } from 'antd/lib/layout/layout';
import { FooterComponent } from '../../components/Footer/FooterComponent';
import { useHistory, useParams } from 'react-router-dom';
import { CANCEL_POPUP, ERROR, RELOAD_PAGE_QUESTION } from '../../constants/common-message';

const { Meta } = Card;

type EmployeeId = {
    empId: string;
};

/**
 * ProfilePage
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
export const ProfilePage = () => {

    let history = useHistory();
    const { empId } = useParams<EmployeeId>();
    var employeeId = Number.parseInt(empId);

    const [id, setId] = useState(0);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('Male');
    const [image, setImage] = useState('');
    const [role, setRole] = useState('');
    const [department, setDepartment] = useState('');

    const { user: currentUser } = useSelector((state: any) => state.auth);

    /**
     * Check if currentUser is null -> redirect to sign in page
     */
    useEffect(() => {
        if (currentUser === null) {
            history.push(`/signin/${"You do not have admin permission!"}`);
        }
    }, [])

    /**
     * Load employee information to the view
     */
    useEffect(() => {
        EmployeeService.getEmployeeByUsername(currentUser.username).then((res) => {
            let employee = res.data;
            setId(employee.id);
            setFullName(employee.fullName ? employee.fullName : "FullName");
            setEmail(employee.email ? employee.email : "Email");
            setPhone(employee.phone ? employee.phone : "Undefined");
            setAddress(employee.address ? employee.address : "Undefined");
            setGender(employee.gender ? employee.gender : "Undefined");
            setImage(employee.image);
            setRole(employee.role ? employee.role.role.substring(5) : "Undefined");
            setDepartment(employee.department ? employee.department.department : "Undefined");
        }).catch((error: AxiosError) => {
            const message = error.response?.data.message
                ? error.response?.data.message
                : error.response?.data;
            errorPopup(ERROR, message);
        })
    }, [])

    /**
     * Process action like update or salary
     * @param id to handle action
     * @param order get action type
     */
    const handleActionPage = (id: number, order: string) => {
        var url = currentUser.roles[0] === "ROLE_ADMIN" ? "/admin" : "";
        if (order === 'update') {
            EmployeeService.getEmployeeById(id).then((res) => {
                history.push(`${url}/employees/update/${id}`);
            }).catch((error: AxiosError) => {
                const message = error.response?.data.message
                    ? error.response?.data.message
                    : error.response?.data;
                errorPopup(ERROR, message);
            })
        } if (order === 'salary') {
            history.push(`/salary/employee/${currentUser.username}`);

        }
        if (order === 'change_password') {
            history.push(`${url}/change_password`);

        }
    }

    /**
    * Show error popup
    * @param title show title error
    * @param error show content error
    */
    function errorPopup(title: string, error: any) {
        Modal.confirm({
            title: title,
            content: <>
                <p>{error}</p>
                <p>{RELOAD_PAGE_QUESTION}</p>
            </>,
            onOk: () => handleOK(),
            onCancel: () => handleCancel()
        });
    }

    /**
   * Show handle popup ok
   */
    const handleOK = () => {
        history.push('/employees');
    }

    /**
    * Cancel popup
    */
    const handleCancel = () => {
        console.log(CANCEL_POPUP);
    };
    //-----------------------------------------------------------------------

    return (
        <React.Fragment>
            {currentUser.roles[0] !== "ROLE_ADMIN" ? (
                <Layout>
                    <HeaderComponent />
                    <Content >
                        <Layout className="site-layout-background" >

                            <Content style={{ padding: ' 24px', minHeight: "100vh" }}>
                                <Row>
                                    <Col span={5}></Col>
                                    <Col span={14}>
                                        <Card
                                            actions={[

                                                <Tooltip title="Update employee">
                                                    <Button
                                                        icon={<EditOutlined key="edit" />}
                                                        onClick={() => handleActionPage(id, 'update')}
                                                    >
                                                    </Button>
                                                </Tooltip>,

                                                <Tooltip title="Salary List">
                                                    <Button
                                                        icon={<ContainerOutlined key="list" />}
                                                        onClick={() => handleActionPage(id, 'salary')}
                                                    >
                                                    </Button>
                                                </Tooltip>,

                                                <Tooltip title="Change Password">
                                                    <Button
                                                        icon={<ArrowUpOutlined key="change" />}
                                                        onClick={() => handleActionPage(id, 'change_password')}
                                                    >
                                                    </Button>
                                                </Tooltip>
                                            ]}
                                        >

                                            <Meta
                                                avatar={<Avatar size="large" src={image} />}
                                                title={fullName}
                                                description={email}
                                            />

                                            <Descriptions title="USER INFORMATION"
                                                layout="vertical"
                                                style={{ marginTop: "15px" }}
                                                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                                                bordered>
                                                <Descriptions.Item label="Role" labelStyle={{ fontWeight: 'bold' }}>
                                                    {role}
                                                </Descriptions.Item>
                                                <Descriptions.Item label="Department" labelStyle={{ fontWeight: 'bold' }}>
                                                    {department}
                                                </Descriptions.Item>
                                                <Descriptions.Item label="Gender" labelStyle={{ fontWeight: 'bold' }}>
                                                    {gender}
                                                </Descriptions.Item>
                                                <Descriptions.Item label="Phone number" labelStyle={{ fontWeight: 'bold' }}
                                                    style={{ textAlign: 'right' }}>
                                                    {phone}
                                                </Descriptions.Item>
                                                <Descriptions.Item label="Address" labelStyle={{ fontWeight: 'bold' }}>
                                                    {address}
                                                </Descriptions.Item>
                                            </Descriptions>
                                        </Card>
                                    </Col>
                                    <Col span={5}></Col>
                                </Row>
                            </Content>

                        </Layout>
                    </Content>
                    <FooterComponent />
                </Layout>
            ) : (
                <Row>
                    <Col span={5}></Col>
                    <Col span={14}>
                        <Card
                            actions={[

                                <Tooltip title="Update employee">
                                    <Button
                                        icon={<EditOutlined key="edit" />}
                                        onClick={() => handleActionPage(id, 'update')}
                                        tabIndex={1}
                                    >
                                    </Button>
                                </Tooltip>,

                                <Tooltip title="Salary List">
                                    <Button
                                        icon={<ContainerOutlined key="list" />}
                                        onClick={() => handleActionPage(id, 'salary')}
                                        tabIndex={2}
                                    >
                                    </Button>
                                </Tooltip>,

                                <Tooltip title="Change Password">
                                    <Button
                                        icon={<ArrowUpOutlined key="change" />}
                                        onClick={() => handleActionPage(id, 'change_password')}
                                        tabIndex={3}
                                    >
                                    </Button>
                                </Tooltip>
                            ]}
                        >

                            <Meta
                                avatar={<Avatar size="large" src={image} />}
                                title={fullName}
                                description={email}
                            />

                            <Descriptions title="USER INFORMATION"
                                layout="vertical"
                                style={{ marginTop: "15px" }}
                                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                                bordered>
                                <Descriptions.Item label="Role" labelStyle={{ fontWeight: 'bold' }}>
                                    {role}
                                </Descriptions.Item>
                                <Descriptions.Item label="Department" labelStyle={{ fontWeight: 'bold' }}>
                                    {department}
                                </Descriptions.Item>
                                <Descriptions.Item label="Gender" labelStyle={{ fontWeight: 'bold' }}>
                                    {gender}
                                </Descriptions.Item>
                                <Descriptions.Item label="Phone number" labelStyle={{ fontWeight: 'bold' }} style={{ textAlign: 'right' }}>
                                    {phone}
                                </Descriptions.Item>
                                <Descriptions.Item label="Address" labelStyle={{ fontWeight: 'bold' }}>
                                    {address}
                                </Descriptions.Item>
                            </Descriptions>
                        </Card>
                    </Col>
                    <Col span={5}></Col>
                </Row>
            )}

        </React.Fragment>
    )
}


