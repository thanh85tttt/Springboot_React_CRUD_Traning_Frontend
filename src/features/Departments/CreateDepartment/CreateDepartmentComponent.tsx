import React, { useEffect, useState } from 'react'
import { Form, Input, Button, message, Row, Col, Card, Modal } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import Title from 'antd/lib/typography/Title';
import { useDispatch, useSelector } from 'react-redux';
import { clearState } from '../../../actions/auth';
import { createDepartment } from '../../../actions/department';
import { CANCEL_POPUP, ERROR, RELOAD_PAGE_QUESTION } from '../../../constants/common-message';
import { DEPARTMENT_PATTERN } from '../../../constants/common-pattern';
import { DEPARTMENT_FULLNAME_LENGTH_RULE, DEPARTMENT_LENGTH_RULE, DEPARTMENT_REQUIRED, FULLNAME_REQUIRED_RULE, NON_WHITE_SPACE_RULE, VALID_FORMAT_DEPARTMENT_RULE } from '../../../constants/common-rules';
import { AppDispatch, RootState } from '../../../store';

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

/**
 * CreateDepartmentComponent
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
export const CreateDepartmentComponent = () => {

    let history = useHistory();

    const [form] = Form.useForm();

    const Success = useSelector((state: RootState) => state.isSuccess)
    const Error = useSelector((state: RootState) => state.isError)

    const dispatch: AppDispatch = useDispatch();

    /**
     * Get success or error message when process actions
     */
    useEffect(() => {
        if (Error) {
            errorPopup(ERROR, Error)
            dispatch(clearState());
        }
        if (Success) {
            history.push('/admin/departments');
            message.success(Success);
            dispatch(clearState());
        }
    }, [Success, Error]);

    /**
     * Process create department
     * @param values contains create department
     */
    const onFinish = (values: any) => {
        dispatch(createDepartment(values));
    };

    /**
     * Process submit fail
     * @param errorInfo show error to log
     */
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    /**
     * Reset field data
     */
    const onReset = () => {
        form.resetFields();
    };

    /**
     * Show error popup
     * @param title popup title
     * @param error content error
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
        history.push('/admin/departments');
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
                    <Card title={<Title level={2}
                        style={{ textAlign: 'center' }}>
                        Create Department
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
                                label="Department"
                                name='department'
                                rules={[
                                    { required: true, message: DEPARTMENT_REQUIRED },
                                    { whitespace: false, message: NON_WHITE_SPACE_RULE },
                                    { min: 1, max: 20, message: DEPARTMENT_LENGTH_RULE },
                                    {
                                        pattern: DEPARTMENT_PATTERN,
                                        message: VALID_FORMAT_DEPARTMENT_RULE
                                    }
                                ]}
                            >
                                <Input tabIndex={11} autoFocus/>
                            </Form.Item>

                            <Form.Item
                                label="FullName"
                                name='fullName'
                                rules={[
                                    { required: true, message: FULLNAME_REQUIRED_RULE },
                                    { min: 1, max: 60, message: DEPARTMENT_FULLNAME_LENGTH_RULE },
                                ]}
                            >
                                <Input tabIndex={12} />
                            </Form.Item>

                            <Form.Item {...tailLayout}>

                                <Link to='/admin/departments' >
                                    <Button type="primary" danger tabIndex={13}>
                                        Back
                                    </Button>
                                </Link>

                                <Button htmlType="button" onClick={onReset} style={{ marginLeft: '5px' }} tabIndex={14}>
                                    Reset
                                </Button>

                                <Button type="primary" htmlType="submit" style={{ marginLeft: '5px' }} tabIndex={15}>
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
