import { Button, Card, Col, Form, Input, Layout, Modal, Row } from 'antd'
import { Content } from 'antd/lib/layout/layout';
import Title from 'antd/lib/typography/Title';
import { AxiosError } from 'axios';
import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { CANCEL_POPUP, ERROR, RELOAD_PAGE_QUESTION, SUCCESS } from '../../constants/common-message';
import { PASSWORD_PATTERN } from '../../constants/common-pattern';
import {
    CONFIRM_PASSWORD_REQUIRED,
    NEW_PASSWORD_REQUIRED,
    OLD_PASSWORD_REQUIRED,
    PASSWORD_LENGTH_RULE,
    VALID_FORMAT_PASSWORD_RULE
} from '../../constants/common-rules';
import { IChangePassword } from '../../interfaces/IChangePassword';
import PasswordService from '../../services/PasswordService';
import { FooterComponent } from '../Footer/FooterComponent';
import { HeaderComponent } from '../Header/HeaderComponent';

const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 17 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

/**
 * ChangePasswordComponent
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
export const ChangePasswordComponent = () => {

    const { user: currentUser } = useSelector((state: any) => state.auth);

    const [form] = Form.useForm();

    let history = useHistory();

    /**
     * Process change password when submit success
     * @param values IChangePassword
     */
    const onFinish = (values: IChangePassword) => {
        console.log(values);

        //Change password service
        PasswordService.processChangePassword(values, currentUser.username)
            .then((res) => {
                history.push("/signin");
                Modal.success(
                    {
                        title: SUCCESS,
                        content: res.data
                    }
                );
            })
            .catch((error: AxiosError) => {
                const message = error.response?.data.message
                    ? error.response?.data.message
                    : error.response?.data;
                errorPopup(ERROR, message);
            })
    };

    /**
     * Process finish fail
     * @param errorInfo show error info
     */
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

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
        history.push('/signin');
    }

    /**
     * Cancel popup
     */
    const handleCancel = () => {
        console.log(CANCEL_POPUP);
    };

    /**
     * Reset data on fields
     */
    const onReset = () => {
        form.resetFields();
    };

    return (
        <React.Fragment>
            {currentUser && currentUser.roles[0] !== "ROLE_ADMIN" ? (
                <Layout>
                    <HeaderComponent />
                    <Content >
                        <Layout className="site-layout-background" >

                            <Content style={{ padding: ' 24px', minHeight: 855 }}>
                                <Row gutter={16}>
                                    <Col span={8}>

                                    </Col>

                                    <Col span={8}>
                                        <Card title={
                                            <Title level={2}
                                                style={{ textAlign: 'center' }}>
                                                Change Password
                                            </Title>
                                        }
                                            bordered={false}>
                                            <Form
                                                {...layout}
                                                name="basic"
                                                initialValues={{ remember: true }}
                                                onFinish={onFinish}
                                                onFinishFailed={onFinishFailed}
                                                labelAlign="left"
                                                form={form}
                                                colon={false}
                                            >

                                                <Form.Item
                                                    label="Old password"
                                                    name="oldPassword"
                                                    rules={[
                                                        { required: true, message: OLD_PASSWORD_REQUIRED },
                                                        {
                                                            min: 8,
                                                            max: 60,
                                                            message: PASSWORD_LENGTH_RULE
                                                        },
                                                        {
                                                            pattern: PASSWORD_PATTERN,
                                                            message: VALID_FORMAT_PASSWORD_RULE
                                                        }
                                                    ]}
                                                >
                                                    <Input.Password autoFocus />
                                                </Form.Item>

                                                <Form.Item
                                                    label="New password"
                                                    name="newPassword"
                                                    rules={[
                                                        { required: true, message: NEW_PASSWORD_REQUIRED },
                                                        {
                                                            min: 8,
                                                            max: 60,
                                                            message: PASSWORD_LENGTH_RULE
                                                        },
                                                        {
                                                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                                                            message: VALID_FORMAT_PASSWORD_RULE
                                                        }
                                                    ]}
                                                >
                                                    <Input.Password />
                                                </Form.Item>

                                                <Form.Item
                                                    label="Confirm password"
                                                    name="confirmPassword"
                                                    rules={[
                                                        { required: true, message: CONFIRM_PASSWORD_REQUIRED },
                                                        {
                                                            min: 8,
                                                            max: 60,
                                                            message: PASSWORD_LENGTH_RULE
                                                        },
                                                        {
                                                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                                                            message: VALID_FORMAT_PASSWORD_RULE
                                                        }
                                                    ]}
                                                >
                                                    <Input.Password />
                                                </Form.Item>

                                                <Form.Item {...tailLayout}>

                                                    <Link to={currentUser.roles[0] === "ROLE_ADMIN" ? '/admin/employees' : '/profile'} >
                                                        <Button type="primary" danger>
                                                            Back
                                                        </Button>
                                                    </Link>

                                                    <Button htmlType="button" onClick={onReset} style={{ marginLeft: '5px' }}>
                                                        Reset
                                                    </Button>

                                                    <Button type="primary" htmlType="submit" style={{ marginLeft: '5px' }}>
                                                        Update
                                                    </Button>
                                                </Form.Item>
                                            </Form>
                                        </Card>
                                    </Col>

                                    <Col span={8}>

                                    </Col>

                                </Row>
                            </Content>

                        </Layout>
                    </Content>
                    <FooterComponent />
                </Layout>
            ) : (
                <Row gutter={16}>
                    <Col span={8}>

                    </Col>

                    <Col span={8}>
                        <Card title={
                            <Title level={2}
                                style={{ textAlign: 'center' }}>
                                Update Employee
                            </Title>
                        }
                            bordered={false}>
                            <Form
                                {...layout}
                                name="basic"
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                labelAlign="left"
                                form={form}
                                colon={false}
                            >

                                <Form.Item
                                    label="Old password"
                                    name="oldPassword"
                                    rules={[
                                        { required: true, message: OLD_PASSWORD_REQUIRED },
                                        {
                                            min: 8,
                                            max: 60,
                                            message: PASSWORD_LENGTH_RULE
                                        },
                                        {
                                            pattern: PASSWORD_PATTERN,
                                            message: VALID_FORMAT_PASSWORD_RULE
                                        }
                                    ]}
                                >
                                    <Input.Password tabIndex={11} autoFocus />
                                </Form.Item>

                                <Form.Item
                                    label="New password"
                                    name="newPassword"
                                    rules={[
                                        { required: true, message: NEW_PASSWORD_REQUIRED },
                                        {
                                            min: 8,
                                            max: 60,
                                            message: PASSWORD_LENGTH_RULE
                                        },
                                        {
                                            pattern: PASSWORD_PATTERN,
                                            message: VALID_FORMAT_PASSWORD_RULE
                                        }
                                    ]}
                                >
                                    <Input.Password tabIndex={12} />
                                </Form.Item>

                                <Form.Item
                                    label="Confirm password"
                                    name="confirmPassword"
                                    rules={[
                                        { required: true, message: CONFIRM_PASSWORD_REQUIRED },
                                        {
                                            min: 8,
                                            max: 60,
                                            message: PASSWORD_LENGTH_RULE
                                        },
                                        {
                                            pattern: PASSWORD_PATTERN,
                                            message: VALID_FORMAT_PASSWORD_RULE
                                        }
                                    ]}
                                >
                                    <Input.Password tabIndex={13} />
                                </Form.Item>

                                <Form.Item {...tailLayout}>

                                    <Link to={currentUser.roles[0] === "ROLE_ADMIN" ? '/admin/employees' : '/profile'} >
                                        <Button type="primary" danger tabIndex={14}>
                                            Back
                                        </Button>
                                    </Link>

                                    <Button htmlType="button" onClick={onReset} style={{ marginLeft: '5px' }} tabIndex={15}>
                                        Reset
                                    </Button>

                                    <Button type="primary" htmlType="submit" style={{ marginLeft: '5px' }} tabIndex={16}>
                                        Update
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>

                    <Col span={8}>

                    </Col>

                </Row>
            )}

        </React.Fragment>
    )
}
