import { Button, Form, Input, Modal } from 'antd'
import { AxiosError } from 'axios';
import React from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import { CANCEL_POPUP, ERROR, RELOAD_PAGE_QUESTION, SUCCESS } from '../../constants/common-message';
import { PASSWORD_PATTERN } from '../../constants/common-pattern';
import {
    CONFIRM_PASSWORD_REQUIRED,
    NEW_PASSWORD_REQUIRED,
    PASSWORD_LENGTH_RULE,
    VALID_FORMAT_PASSWORD_RULE
}
    from '../../constants/common-rules';
import { IResetPassword } from '../../interfaces/IResetPassword';
import PasswordService from '../../services/PasswordService';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

type Token = {
    token: string;
};

/**
 * ResetPasswordPage
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
export const ResetPasswordPage = () => {

    const [form] = Form.useForm();

    let history = useHistory();
    const { token } = useParams<Token>();

    /**
     * Process reset password
     * @param values contain reset password information
     */
    const onFinish = (values: IResetPassword) => {
        PasswordService.processResetPassword(values, token)
            .then((res) => {
                Modal.success({
                    title: SUCCESS,
                    content: res.data
                });
                history.push("/signin");
            }).catch((error: AxiosError) => {
                const message = error.response?.data.message
                    ? error.response?.data.message
                    : error.response?.data;
                errorPopup(ERROR, message);
            })
    };

    /**
     * Process when submit fail
     * @param errorInfo show error to log
     */
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

      /**
     * Show error popup
     * @param title popup title
     * @param error content in popup
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
     * Handle OK button popup
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

    return (
        <div className="authForm">
            <div className="authForm__card">
                <h1 className="authForm__title" style={{ textAlign: "center" }}>
                    Forgot Password
                </h1>
                <p>We will be sending a reset password link to your email.</p>
                <Form
                    name="basic"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    className="login-form"
                    labelAlign="left"
                    layout="vertical"
                    form={form}
                    colon={false}
                >
                    <Form.Item
                        label="New password"
                        name="password"
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
                        <Input.Password tabIndex={11} autoFocus/>
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
                        <Input.Password tabIndex={12}/>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Link to="/forgot_password">
                            <Button type="primary" danger tabIndex={13}>
                                Back
                            </Button>
                        </Link>

                        <Button type="primary" htmlType="submit"
                            className="login-form-button"
                            style={{ marginLeft: "5px" }}
                            tabIndex={14}>
                            Send
                    </Button>
                    </Form.Item>
                </Form>

            </div>
        </div>
    )
}
