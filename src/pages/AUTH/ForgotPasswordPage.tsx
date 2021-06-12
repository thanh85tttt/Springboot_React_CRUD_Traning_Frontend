import { Button, Form, Input, Modal} from 'antd'
import { AxiosError } from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { CANCEL_POPUP, ERROR, RELOAD_PAGE_QUESTION, SUCCESS } from '../../constants/common-message';
import { EMAIL_PATTERN } from '../../constants/common-pattern';
import { EMAIL_LENGTH_RULE, EMAIL_REQUIRED_RULE, VALID_FORMAT_EMAIL_RULE } from '../../constants/common-rules';
import PasswordService from '../../services/PasswordService';

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

/**
 * ForgotPasswordPage
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
export const ForgotPasswordPage = () => {

    let history = useHistory();

    const [form] = Form.useForm();

    /**
     * Process send link to email if email exist
     * @param values email to send link contain reset password token
     */
    const onFinish = (values: {email: string}) => {

        var email: string = values.email;

        console.log(email);
        
        //Forgot password service
        PasswordService.processForgotPassword(email)
            .then((res) => {
                console.log(res.data);
                
                Modal.success({
                    title: SUCCESS,
                    content: res.data
                });
            })
            .catch((error: AxiosError) => {
                const message = error.response?.data.message
                    ? error.response?.data.message
                    : error.response?.data;
                errorPopup(ERROR, message);
            });
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

    return (
        <div className="authForm">
            <div className="authForm__card">
                <h1 className="authForm__title" style={{ textAlign: "center" }}>
                    Forgot Password
                    </h1>
                <p>We will be sending a reset password link to your email.</p>
                <Form
                    name="basic"
                    className="login-form"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    labelAlign="left"
                    layout="vertical"
                    form={form}
                    colon={false}
                >
                    <Form.Item
                        label="Email"
                        name='email'
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
                    >
                        <Input tabIndex={11} autoFocus/>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Link to="/signin">
                            <Button type="primary" danger tabIndex={12}>
                                Back
                            </Button>
                        </Link>

                        <Button type="primary" htmlType="submit"
                            className="login-form-button"
                            style={{ marginLeft: "5px" }}
                            tabIndex={13}>
                            Send
                    </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
