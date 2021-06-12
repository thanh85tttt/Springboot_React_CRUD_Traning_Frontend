import React, { useEffect, useState } from 'react'
import { Form, Input, Button, message, Row, Col, Card, Modal } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import Title from 'antd/lib/typography/Title';
import { useDispatch, useSelector } from 'react-redux';
import { clearState } from '../../../actions/auth';
import { createRole } from '../../../actions/role';
import { CANCEL_POPUP, ERROR, RELOAD_PAGE_QUESTION } from '../../../constants/common-message';
import { ROLE_PATTERN } from '../../../constants/common-pattern';
import { NON_WHITE_SPACE_RULE, ROLE_LENGTH_RULE, ROLE_REQUIRED, VALID_FORMAT_ROLE_RULE } from '../../../constants/common-rules';
import { AppDispatch, RootState } from '../../../store';

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

/**
 * CreateRoleComponent
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
export const CreateRoleComponent = () => {

    let history = useHistory();

    const [form] = Form.useForm();

    const Success = useSelector((state: RootState) => state.isSuccess)
    const Error = useSelector((state: RootState) => state.isError)

    const dispatch: AppDispatch = useDispatch();

    /**
     * Load department list when has change, load error and success message
     */
    useEffect(() => {
        if (Error) {
            errorPopup(ERROR, Error)
            dispatch(clearState());
        }
        if (Success) {
            history.push('/admin/roles');
            message.success(Success);
            dispatch(clearState());
        }
    }, [Success, Error]);

    /**
     * Process update when submit success
     * @param values contains create information
     */
    const onFinish = (values: any) => {
        if (!values.role.includes("ROLE_")) {
            values.role = "ROLE_" + values.role;
        }
        dispatch(createRole(values));
    };

    /**
     * Process when submit fail
     * @param errorInfo show error to log
     */
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    /**
     * Reset data fields
     */
    const onReset = () => {
        form.resetFields();
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
        history.push('/admin/roles');
    }

     /**
     * Cancel popup
     */
    const handleCancel = () => {
        console.log(CANCEL_POPUP);
    };

    return (
        <React.Fragment>

            <Row gutter={16}>
                <Col span={7}>

                </Col>
                <Col span={10}>
                    <Card title={<Title
                        level={2}
                        style={{ textAlign: 'center' }}>
                        Create Role
                        </Title>}
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
                                label="Role"
                                name='role'
                                rules={[
                                    { required: true, message: ROLE_REQUIRED },
                                    { whitespace: false, message: NON_WHITE_SPACE_RULE },
                                    {
                                        min: 1, max: 50,
                                        message: ROLE_LENGTH_RULE
                                    },
                                    {
                                        pattern: ROLE_PATTERN,
                                        message: VALID_FORMAT_ROLE_RULE
                                    }
                                ]}
                            >
                                <Input tabIndex={11} autoFocus/>
                            </Form.Item>

                            <Form.Item {...tailLayout}>

                                <Link to='/admin/roles'>
                                    <Button type="primary" danger tabIndex={12}>
                                        Back
                                    </Button>
                                </Link>

                                <Button htmlType="button" onClick={onReset} style={{ marginLeft: '5px' }} tabIndex={13}>
                                    Reset
                                </Button>

                                <Button type="primary" htmlType="submit" style={{ marginLeft: '5px' }} tabIndex={14}
                                    >
                                    Submit
                                </Button>

                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
                <Col span={7}>

                </Col>
            </Row>

        </React.Fragment>
    )
}
