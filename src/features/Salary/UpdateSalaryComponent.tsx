import React, { useEffect, useState } from 'react'
import { Form, Input, Button, message, Row, Col, Card, InputNumber, Modal, DatePicker } from 'antd';
import { Link, useHistory, useParams } from 'react-router-dom';
import Title from 'antd/lib/typography/Title';
import SalaryService from '../../services/SalaryService';
import { AxiosError } from 'axios';
import moment from 'moment';
import { CANCEL_POPUP, ERROR, RELOAD_PAGE_QUESTION } from '../../constants/common-message';
import { CREATED_DATE_REQUIRED_RULE, SALARY_REQUIRED } from '../../constants/common-rules';
import { DATE_FORMAT } from '../../constants/common-pattern';

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};


type ISalary = {
    email: string,
    createdDate: string
};

/**
 * ListDepartmentsComponent
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
export const UpdateSalaryComponent = () => {

    let { email, createdDate } = useParams<ISalary>();

    let history = useHistory();

    const [form] = Form.useForm();

    const [currentDate, setCurrentDate] = useState("");

    /**
     * Set default date to createdDate field and endDate field
     */
    useEffect(() => {
        var date = new Date();
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0');
        var yyyy = date.getFullYear();

        setCurrentDate(yyyy + "-" + mm + "-" + dd);
    }, [])

    /**
     * Get salary by email and createdDate
     */
    useEffect(() => {
        SalaryService.getSalaryExistByEmployeeEmailAndCreatedDate(email, createdDate).then((res) => {
            let salary = res.data;

            //Set data to form fields
            form.setFieldsValue({
                employee: salary.employee.fullName,
                salary: salary.salary,
                createdDate: moment(salary.createdDate, DATE_FORMAT),
                endDate: salary.endDate ? moment(salary.endDate, DATE_FORMAT) : "",
            });
        }).catch((error: AxiosError) => {
            const message = error.response?.data.message
                ? error.response?.data.message
                : error.response?.data;
            errorPopup(ERROR, message);
        })
    });

    /**
     * Process update salary
     * @param values contains update information
     */
    const onFinish = (values: any) => {

        values.createdDate = values.createdDate.format('YYYY-MM-DD');
        values.endDate = values.endDate ? values.endDate.format('YYYY-MM-DD') : "";

        SalaryService.updateSalary(values, email, createdDate).then((res) => {
            history.push('/admin/salary');
            message.success(res.data);
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
        history.push('/admin/salary');
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
                        Update Salary
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
                                label="Employee"
                                name='employee'
                            >
                                <Input disabled tabIndex={-1} />
                            </Form.Item>

                            <Form.Item
                                label="Salary"
                                name='salary'
                                rules={[{ required: true, message: SALARY_REQUIRED }]}
                            >
                                <InputNumber
                                    min="0"
                                    max="1000000000"
                                    defaultValue="0"
                                    tabIndex={11}
                                    style={{ width: "30%" }}
                                    autoFocus />
                            </Form.Item>

                            <Form.Item
                                label="CreatedDate"
                                name='createdDate'
                                rules={[
                                    {
                                        required: true,
                                        message: CREATED_DATE_REQUIRED_RULE
                                    }
                                ]}
                            >
                                <DatePicker defaultValue={moment(currentDate, DATE_FORMAT)}
                                    format={DATE_FORMAT} tabIndex={12} />
                            </Form.Item>

                            <Form.Item
                                label="EndDate"
                                name='endDate'
                            >
                                <DatePicker defaultValue={moment(currentDate, DATE_FORMAT)}
                                    format={DATE_FORMAT} tabIndex={13} />
                            </Form.Item>

                            <Form.Item {...tailLayout}>

                                <Button type="primary" danger tabIndex={14} onClick={() => history.goBack()}>
                                    Back
                                </Button>

                                <Button htmlType="button" onClick={onReset} style={{ marginLeft: '5px' }} tabIndex={15}>
                                    Reset
                                </Button>

                                <Button type="primary" htmlType="submit" style={{ marginLeft: '5px' }} tabIndex={16}>
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
