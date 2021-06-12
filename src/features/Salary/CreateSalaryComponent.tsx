import React, { ChangeEvent, useEffect } from 'react'
import { Form, Input, Button, message, Row, Col, Card, InputNumber, Modal } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import Title from 'antd/lib/typography/Title';
import SalaryService from '../../services/SalaryService';
import EmployeeService from '../../services/EmployeeService';
import { AxiosError } from 'axios';
import { CANCEL_POPUP, ERROR, MERGE_SALARY_QUESTION, RELOAD_PAGE_QUESTION } from '../../constants/common-message';
import { EMAIL_PATTERN } from '../../constants/common-pattern';
import { EMAIL_LENGTH_RULE, EMAIL_REQUIRED_RULE, SALARY_REQUIRED, VALID_FORMAT_EMAIL_RULE } from '../../constants/common-rules';
import { useDispatch, useSelector } from 'react-redux';
import { clearState } from '../../actions/auth';
import { createSalary } from '../../actions/salary';
import { AppDispatch, RootState } from '../../store';

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

/**
 * CreateSalaryComponent
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
export const CreateSalaryComponent = () => {

    let history = useHistory();

    const [form] = Form.useForm();

    const Success = useSelector((state: RootState) => state.isSuccess)
    const Error = useSelector((state: RootState) => state.isError)

    const dispatch: AppDispatch = useDispatch();

    /**
     * Load error and success message
     */
    useEffect(() => {
        if (Error) {
            errorPopup(ERROR, Error)
            dispatch(clearState());
        }
        if (Success) {
            history.push('/admin/salary');
            message.success(Success);
            dispatch(clearState());
        }
    }, [Success, Error]);

    /**
     * Process create salary when submit success
     * @param values contains create information
     */
    const onFinish = (values: any) => {
        var salary = {
            employee: values.employee,
            salary: values.salary
        };

        var date = new Date();
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0');
        var yyyy = date.getFullYear();

        var currentDate = yyyy + "-" + mm + "-" + dd;

        //Check if salary of an employee is already created in that date, 
        //asking admin to merge new salary to older salary of that employee
        SalaryService.isSalaryExistByEmployeeEmailAndCreatedDate(values.email, currentDate)
        .then((res) => {
            if(res.data === true){
                createPopup(values.email, salary);
            }else{
                dispatch(createSalary(values.email, salary));
            }
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
     * Get employee after enter email
     * @param event change event
     */
    const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
        var email: string = event.currentTarget.value;
        var regex = new RegExp(EMAIL_PATTERN);
        if (regex.test(email) && email.includes(".com" || ".com.vn")) {

            //Get employee by email, then pass fullName to fullName field
            EmployeeService.getEmployeeByEmail(email).then((res) => {
                let empl = res.data;
                form.setFieldsValue({
                    employee: empl.fullName
                });
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
        history.push('/admin/salary');
    }

    /**
     * Cancel popup
     */
    const handleCancel = () => {
        console.log(CANCEL_POPUP);
    };

    /**
     * Popup create when have new salary in that date and want to merge it
     * @param email to send to handleCreateOK
     * @param salary to send to handleCreateOK
     */
    function createPopup(email: string, salary: any) {
        Modal.confirm({
            title: "Info!",
            content: MERGE_SALARY_QUESTION,
            onOk: () => handleCreateOK(email, salary),
            onCancel: () => handleCancel()
        });
    }

    /**
     * Create salary after click OK in createPopup
     * @param email to create salary
     * @param salary to create salary
     */
    const handleCreateOK = (email: string, salary: any) => {
        dispatch(createSalary(email, salary));
    }

    return (
        <React.Fragment>

            <Row gutter={16}>
                <Col span={8}>

                </Col>
                <Col span={8}>
                    <Card title={<Title level={2}
                        style={{ textAlign: 'center' }}>
                        Create New Salary
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
                                <Input disabled tabIndex={-1}/>
                            </Form.Item>

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
                                <Input onChange={(event) => handleChangeEmail(event)} tabIndex={11} autoFocus/>
                            </Form.Item>

                            <Form.Item
                                label="Salary"
                                name='salary'
                                rules={[
                                    { required: true, message: SALARY_REQUIRED }
                                ]}

                            >
                                <InputNumber 
                                min="0" 
                                max="1000000000" 
                                defaultValue="0" 
                                tabIndex={12} 
                                style={{width: "30%"}}/>
                            </Form.Item>

                            <Form.Item {...tailLayout}>

                                <Link to='/admin/salary' >
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
                <Col span={8}>

                </Col>
            </Row>

        </React.Fragment>
    )
}
