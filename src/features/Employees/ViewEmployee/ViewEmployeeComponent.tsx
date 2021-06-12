import React, { useEffect, useState } from 'react'
import { Card, Col, Row, message, Popconfirm, Button, Modal, Descriptions, Avatar, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import EmployeeService from '../../../services/EmployeeService';
import { AxiosError } from 'axios';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CANCEL_DELETE, CANCEL_POPUP, DELETE_SUCCESS, ERROR, POPUP_DELETE_TITLE, RELOAD_PAGE_QUESTION, UNDEFINED } from '../../../constants/common-message';
import { RootState } from '../../../store';

const { Meta } = Card;

type EmployeeId = {
    id: string;
};

/**
 * ViewEmployeeComponent
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
export const ViewEmployeeComponent = () => {

    const { id } = useParams<EmployeeId>();
    var employeeId = Number.parseInt(id);

    const { user: currentUser } = useSelector((state: RootState) => state.auth);

    let history = useHistory();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('Male');
    const [image, setImage] = useState('');
    const [role, setRole] = useState('');
    const [department, setDepartment] = useState('');

    /**
     * Load data to view form
     */
    useEffect(() => {
        EmployeeService.getEmployeeById(employeeId).then((res) => {
            let employee = res.data;
            setFullName(employee.fullName ? employee.fullName : "FullName");
            setEmail(employee.email ? employee.email : "Email");
            setPhone(employee.phone ? employee.phone : UNDEFINED);
            setAddress(employee.address ? employee.address : UNDEFINED);
            setGender(employee.gender ? employee.gender : UNDEFINED);
            setImage(employee.image);
            setRole(employee.role ? employee.role.role.substring(5) : UNDEFINED);
            setDepartment(employee.department ? employee.department.department : UNDEFINED);

        }).catch((error: AxiosError) => {
            errorPopup(ERROR, error);
        })
    }, [])
   
    /**
     * Handle delete action
     * @param id to delete employee
     */
    function handleDelete(id: number) {
        EmployeeService.deleteEmployee(id).then((res) => {
            history.push('/admin/employees');
            message.success(DELETE_SUCCESS);
        }).catch((error: AxiosError) => {
            const message = error.response?.data.message
                    ? error.response?.data.message
                    : error.response?.data;
            errorPopup(ERROR, message);
        })
    }

    /**
     * Cancel delete action
     * @param e 
     */
    function cancelDelete(e: any) {
        console.log(e);
        message.error(CANCEL_DELETE);
    }
    
    /**
     * Handle action
     * @param id to update
     * @param order to get action types
     */
    const handleActionPage = (id: number, order: string) => {
        if (order === 'update') {
            EmployeeService.getEmployeeById(id).then((res) => {
                history.push(`/admin/employees/update/${id}`);
            }).catch((error: AxiosError) => {
                const message = error.response?.data.message
                    ? error.response?.data.message
                    : error.response?.data;
                errorPopup(ERROR, message);
            })
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
        history.push('/admin/employees');
    }

    /**
     * Cancel popup
     */
    const handleCancel = () => {
        console.log(CANCEL_POPUP);
    };

    return (
        <React.Fragment>
            <Row>
                <Col span={5}></Col>
                <Col span={14}>
                    <Card
                        actions={[

                            <Tooltip title="Update employee">
                                <Button
                                    icon={<EditOutlined key="edit" />}
                                    onClick={() => handleActionPage(employeeId, 'update')}
                                    tabIndex={11}
                                >
                                </Button>
                            </Tooltip>,

                            <Popconfirm
                                title={POPUP_DELETE_TITLE}
                                onConfirm={() => {
                                    handleDelete(employeeId);
                                }}
                                onCancel={cancelDelete}
                                okText="Yes"
                                cancelText="No"
                                disabled={currentUser.username === email ? true : false}
                            >
                                <Tooltip title="Delete employee">
                                    <Button
                                        icon={<DeleteOutlined />}
                                        disabled={currentUser.username === email ? true : false}
                                        tabIndex={12}
                                    >
                                    </Button>
                                </Tooltip>
                            </Popconfirm>
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
                            <Descriptions.Item label="Phone number" labelStyle={{ fontWeight: 'bold' }} style={{textAlign: 'right'}}>
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
        </React.Fragment>
    )
}


