import React, { useEffect, useState } from 'react'
import { Form, Input, Button, message, Row, Col, Card, Select, Modal } from 'antd';
import EmployeeService from '../../../services/EmployeeService';
import { Link, useHistory, useParams } from 'react-router-dom';
import Title from 'antd/lib/typography/Title';
import { AxiosError } from 'axios';
import { IEmployeeRoleAndDepartment } from '../../../interfaces/IEmployeeRoleAndDepartment';
import RoleService from '../../../services/RoleService';
import { IRole } from '../../../interfaces/IRole';
import DepartmentService from '../../../services/DepartmentService';
import { IDepartment } from '../../../interfaces/IDepartment';
import { useDispatch, useSelector } from 'react-redux';
import { clearState } from '../../../actions/auth';
import { updateRoleAndDepartment } from '../../../actions/roleAndDepartment';
import { CANCEL_POPUP, ERROR, NOT_EXIST_ROLE_DEPARTMENT, RELOAD_PAGE_QUESTION, WARNING } from '../../../constants/common-message';
import { DEPARTMENT_REQUIRED_RULE, ROLE_REQUIRED_RULE } from '../../../constants/common-rules';
import { AppDispatch, RootState } from '../../../store';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const { Option } = Select;


type EmployeeEmail = {
    email: string;
};

/**
 * UpdateEmployeesRoleAndDepartment
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
export const UpdateEmployeesRoleAndDepartment = () => {

    const { email } = useParams<EmployeeEmail>();

    let history = useHistory();

    const [form] = Form.useForm();

    const [rolesList, setRolesList] = useState<IRole[]>([]);
    const [departmentsList, setDepartmentsList] = useState<IDepartment[]>([]);

    const Success = useSelector((state: RootState) => state.isSuccess);
    const Error = useSelector((state: RootState) => state.isError);

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
            history.push("/admin/employees/role-and-department");
            message.success(Success);
            dispatch(clearState());
        }
    }, [Success, Error]);

    /**
     * Process update when submit success
     * @param values contains update information
     */
    const onFinish = (values: IEmployeeRoleAndDepartment) => {

        var isOptionRoleTextExist = false;
        var isOptionDepartmentTextExist = false;
        var textInOption = document.getElementsByClassName('ant-select-selection-item');

        //Check role title is exist in database
        rolesList?.map((role: any) => {
            if (role.role === ("ROLE_" + textInOption[0].innerHTML)) {
                isOptionRoleTextExist = true;
            }
        });

        //Check department title is exist in database
        departmentsList?.map((department: any) => {
            if (department.department === textInOption[1].innerHTML) {
                isOptionDepartmentTextExist = true;
            }
        });

        //If two flags is true, process update role and department action
        //Else throw message
        if (isOptionRoleTextExist && isOptionDepartmentTextExist) {
            var employee: IEmployeeRoleAndDepartment = {
                fullName: values.fullName,
                email: values.email,
                role: values.role,
                department: values.department,
            }

            dispatch(updateRoleAndDepartment(employee, email));

        } else {
            errorPopup(WARNING, NOT_EXIST_ROLE_DEPARTMENT);
        }
    };

    /**
     * Process when submit fail
     * @param errorInfo show error to log
     */
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    /**
     * Get employee role and department and set data to fields
     */
    useEffect(() => {
        EmployeeService.getEmployeeRoleAndDepartmentById(email).then((res) => {

            let employee = res.data;

            //Set data to form fields 
            form.setFieldsValue({
                fullName: employee.fullName,
                email: employee.email,
                role: employee.role,
                department: employee.department
            });

        })
            .catch((error: AxiosError) => {
                const message = error.response?.data.message
                    ? error.response?.data.message
                    : error.response?.data;
                errorPopup(ERROR, message);
            })

        //Set role list to select options
        RoleService.getRoles().then((res: any) => {
            setRolesList(res.data);
        })

        //Set department list to select options
        DepartmentService.getDepartments().then((res: any) => {
            setDepartmentsList(res.data);
        })

    }, [])

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
        history.push('/admin/employees/role-and-department');
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
                <Col span={6}>

                </Col>

                <Col span={12}>
                    <Card title={<Title level={2} style={{ textAlign: 'center' }}>Update Role & Department</Title>} bordered={false}>
                        <Form
                            {...layout}
                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            form={form}
                        >

                            <Form.Item
                                label="FullName"
                                name='fullName'
                            >
                                <Input disabled />
                            </Form.Item>

                            <Form.Item
                                label="Email"
                                name='email'
                            >
                                <Input disabled />
                            </Form.Item>

                            <Form.Item name="role" label="Role" rules={[
                                {
                                    required: true,
                                    message: ROLE_REQUIRED_RULE
                                }
                            ]}>
                                <Select
                                    placeholder="Select"
                                    allowClear
                                    tabIndex={11}
                                >
                                    {
                                        rolesList.map((role: IRole, index: number) => (
                                            <Option value={role.role} key={index}>{role.role.substring(5)}</Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>

                            <Form.Item name="department" label="Department" rules={[
                                {
                                    required: true,
                                    message: DEPARTMENT_REQUIRED_RULE
                                }
                            ]}>
                                <Select
                                    placeholder="Select"
                                    allowClear
                                    tabIndex={12}
                                >
                                    {
                                        departmentsList.map((department: IDepartment, index: number) => (
                                            <Option value={department.department} key={index}>{department.department}</Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>

                            <Form.Item {...tailLayout}>

                                <Link to='/admin/employees/role-and-department'>
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

                <Col span={6}>

                </Col>

            </Row>

        </React.Fragment>
    )
}



