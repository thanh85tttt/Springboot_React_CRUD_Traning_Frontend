import React, { useEffect, useState } from 'react'
import { Form, Input, Button, message, Row, Col, Card, DatePicker, Modal } from 'antd';
import { Link, useHistory, useParams } from 'react-router-dom';
import Title from 'antd/lib/typography/Title';
import RoleService from '../../../services/RoleService';
import moment from 'moment';
import { AxiosError } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { clearState } from '../../../actions/auth';
import { updateRole } from '../../../actions/role';
import { CANCEL_POPUP, ERROR, RELOAD_PAGE_QUESTION } from '../../../constants/common-message';
import { CREATED_DATE_REQUIRED_RULE, NON_WHITE_SPACE_RULE, ROLE_LENGTH_RULE, ROLE_REQUIRED, VALID_FORMAT_ROLE_RULE } from '../../../constants/common-rules';
import { DATE_FORMAT, ROLE_PATTERN } from '../../../constants/common-pattern';
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
 * UpdateRoleComponent
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
export const UpdateRoleComponent = () => {

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
     * @param values contains update information
     */
    const onFinish = (values: any) => {

        if (!values.role.includes("ROLE_")) {
            values.role = "ROLE_" + values.role;
        }
        
        values.createdDate = values.createdDate.format('YYYY-MM-DD');

        dispatch(updateRole(values, employeeId));
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
     * Get Role from Server
     */
    useEffect(() => {
        RoleService.getRoleById(employeeId).then((res) => {
            let role = res.data;

            form.setFieldsValue({
                role: role.role.substring(5),
                createdDate: moment(role.createdDate, DATE_FORMAT),
            });

        }).catch((error: AxiosError) => {
            const message = error.response?.data.message
                ? error.response?.data.message
                : error.response?.data;
            errorPopup(ERROR, message);
        })
    }, [])

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
        message.info(CANCEL_POPUP);
    };

    return (
        <React.Fragment>

            <Row gutter={16}>
                <Col span={7}>

                </Col>
                <Col span={10}>
                    <Card
                        title={
                            <Title level={2}
                                style={{ textAlign: 'center' }}>
                                Update Role
                            </Title>
                        }
                        bordered={false}
                    >
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
                                <DatePicker
                                    defaultValue={moment(currentDate, DATE_FORMAT)}
                                    format={DATE_FORMAT} tabIndex={12} />
                            </Form.Item>

                            <Form.Item {...tailLayout}>

                                <Link to='/admin/roles' >
                                    <Button type="primary" danger tabIndex={13}>
                                        Back
                                    </Button>
                                </Link>

                                <Button htmlType="button" onClick={onReset} style={{ marginLeft: '5px' }} tabIndex={14}>
                                    Reset
                                </Button>

                                <Button type="primary" htmlType="submit" style={{ marginLeft: '5px' }} tabIndex={15}>
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
