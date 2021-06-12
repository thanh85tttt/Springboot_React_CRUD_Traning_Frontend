
import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Modal } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";
import { clearState, login, logout } from "../../actions/auth";
import "./auth.css";
import { ERROR, LOGIN_SUCCESS, SUCCESS, WARNING } from '../../constants/common-message';
import { EMAIL_LENGTH_RULE, EMAIL_REQUIRED_RULE, VALID_FORMAT_EMAIL_RULE, PASSWORD_LENGTH_RULE, VALID_FORMAT_PASSWORD_RULE, PASSWORD_REQUIRED } from '../../constants/common-rules';
import { EMAIL_PATTERN, } from '../../constants/common-pattern';
import { AppDispatch, RootState } from '../../store';

/**
 * LoginPage
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

interface IMessage {
    msg: string
}

export const LoginPage = () => {

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    let { msg } = useParams<IMessage>();

    let history = useHistory();

    const { user: currentUser } = useSelector((state: RootState) => state.auth)
    const Success = useSelector((state: RootState) => state.isSuccess)
    const Error = useSelector((state: RootState) => state.isError)

    const dispatch: AppDispatch = useDispatch();

    /**
     * Clear state
     */
    useEffect(() => {
        return () => {
            dispatch(clearState());
        }
    }, [])

    /**
     * Load error and success message if exist
     */
    useEffect(() => {
        if (Error) {
            errorPopup(ERROR, Error);
            dispatch(clearState());
        }
        if (Success) {
            const user = JSON.parse(localStorage.getItem("user") || 'null');
            if (user) {
                if (user.roles[0] === "ROLE_ADMIN") {
                    history.push("/");
                } else {
                    history.push("/profile");
                }
            }
            dispatch(clearState());
        }
    }, [Success, Error]);

    /**
     * Process login when submit success
     * @param values contains login information
     */
    const onFinish = (values: any) => {
        setLoading(true);
        dispatch(login(values))
    };

    /**
     * Process when submit fail
     * @param errorInfo show error to log 
     */
    const onFinishFailed = (errorInfo: any) => {
        (document.getElementsByClassName("ant-input")[0] as HTMLElement).focus();
    };

    /**
     * Process show message popup when logout
     */
    useEffect(() => {
        if (msg) {
            errorPopup(WARNING, msg);
        }
        if (currentUser) {
            dispatch(logout());
        }
    }, [])

    /**
     * Clear message
     */
    useEffect(() => {
        return () => {
            dispatch(clearState());
        };
    }, []);

    /**
     * Load error and success message
     */
    useEffect(() => {
        if (Error) {
            setErrorMessage("Username or password invalid!");
            dispatch(clearState());
        }

        if (Success) {
            errorPopup(SUCCESS, Success);
            dispatch(clearState());
        }
    }, [Success, Error]);

    /**
     * Show error popup
     * @param title popup title
     * @param error content in popup
     */
    function errorPopup(title: string, error: string) {
        Modal.info({
            title: title,
            content: error
        });
    }

    return (
        <div className="authForm">
            <div className="authForm__card">
                <h1 className="authForm__title">Sign In</h1>
                <p style={{ color: "red" }}>{errorMessage}</p>

                <Form
                    name="basic"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    labelAlign="left"
                    layout="vertical"
                    onChange={() => { setErrorMessage('') }}
                    colon={false}
                >
                    <Form.Item
                        label="Email"
                        name="username"
                        rules={[
                            { required: true, message: EMAIL_REQUIRED_RULE },
                            {
                                pattern: EMAIL_PATTERN,
                                message: VALID_FORMAT_EMAIL_RULE
                            },
                            {
                                min: 6,
                                max: 60,
                                message: EMAIL_LENGTH_RULE
                            }
                        ]}
                        tooltip="This is a required field"
                    >
                        <Input tabIndex={11} autoFocus />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            { required: true, message: PASSWORD_REQUIRED }
                        ]}
                        tooltip="This is a required field"
                    >
                        <Input.Password tabIndex={12} />
                    </Form.Item>

                    <Form.Item>

                        <Link to="/forgot_password" className="login-form-forgot" tabIndex={13}>
                            Forgot your password?
                        </Link>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            style={{ marginRight: "5px" }}
                            tabIndex={14}
                        >
                            Sign In
                        </Button >
                    </Form.Item>

                </Form>

            </div>
        </div>
    );
}

