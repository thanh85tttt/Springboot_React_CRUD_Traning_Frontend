import React, { useEffect, useState } from 'react'
import { Form, Input, Button, message, Row, Col, Card, DatePicker, Modal } from 'antd';
import { Link, useHistory, useParams } from 'react-router-dom';
import Title from 'antd/lib/typography/Title';
import moment from 'moment';
import DepartmentService from '../../../services/DepartmentService';
import { AxiosError } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { clearState } from '../../../actions/auth';
import { updateDepartment } from '../../../actions/department';
import { CANCEL_POPUP, ERROR, RELOAD_PAGE_QUESTION } from '../../../constants/common-message';
import { CREATED_DATE_REQUIRED_RULE, DEPARTMENT_FULLNAME_LENGTH_RULE, DEPARTMENT_LENGTH_RULE, DEPARTMENT_REQUIRED, FULLNAME_REQUIRED_RULE, NON_WHITE_SPACE_RULE, VALID_FORMAT_DEPARTMENT_RULE } from '../../../constants/common-rules';
import { DATE_FORMAT, DEPARTMENT_PATTERN } from '../../../constants/common-pattern';
import { AppDispatch, RootState } from '../../../store';

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

type EmployeeId = {
    id: string;
};

/**
 * UpdateDepartmentComponent
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
export const UpdateDepartmentComponent = () => {

    const { id } = useParams<EmployeeId>();
    var employeeId = Number.parseInt(id);

    let history = useHistory();

    const [form] = Form.useForm();

    const [currentDate, setCurrentDate] = useState("");

    const Success = useSelector((state: RootState) => state.isSuccess)
    const Error = useSelector((state: RootState) => state.isError)

    const dispatch: AppDispatch = useDispatch();
    
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
     * Load error and success message
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
     * Process update when submit success
     * @param values contains update information
     */
    const onFinish = (values: any) => {

        values.createdDate = values.createdDate.format('YYYY-MM-DD');

        dispatch(updateDepartment(values, employeeId));
    };

    /**
     * Process when finish fail
     * @param errorInfo show error message to log
     */
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    /**
     * Re set data fields
     */
    const onReset = () => {
        form.resetFields();
    };

    /**
     * Get department by id
     */
    useEffect(() => {
        DepartmentService.getDepartmentById(employeeId).then((res) => {
            let department = res.data;
            
            //Set field values for form
            form.setFieldsValue({
                department: department.department,
                createdDate: moment(department.createdDate, DATE_FORMAT),
                fullName: department.fullName
            });
        }).catch((error: AxiosError) => {
            const message = error.response?.data.message
                ? error.response?.data.message
                : error.response?.data;
            errorPopup(ERROR, message);
        })
    }, [])

    /**
     * Show popup
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
        history.push('/admin/departments');
    }

    /**
    * Cancel popup
    */
    const handleCancel = () => {
        message.info(CANCEL_POPUP);
    };

    return (
        <React.Fragment>

            <Row gutter={16}>
                <Col span={7}>

                </Col>
                <Col span={10}>
                    <Card title={<Title level={2} style={{ textAlign: 'center' }}>Update Department</Title>} bordered={false}>
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
                                    format={DATE_FORMAT} tabIndex={13} />
                            </Form.Item>

                            <Form.Item {...tailLayout}>

                                <Link to='/admin/departments' >
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
                <Col span={7}>

                </Col>
            </Row>

        </React.Fragment>
    )
}
