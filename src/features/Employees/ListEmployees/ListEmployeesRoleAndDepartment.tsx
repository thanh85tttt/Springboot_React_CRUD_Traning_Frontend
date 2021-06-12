import React, { ChangeEvent, useEffect, useState } from 'react'

import { Table, Space, Button, message, Modal, Tooltip, Row, Col } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import EmployeeService from '../../../services/EmployeeService';
import { AxiosError } from 'axios';
import { IEmployeeRoleAndDepartment } from '../../../interfaces/IEmployeeRoleAndDepartment';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { clearState } from '../../../actions/auth';
import { listRoleAndDepartment, searchEmployeeRoleAndDepartment } from '../../../actions/roleAndDepartment';
import Search from 'antd/lib/input/Search';
import { CANCEL_POPUP, ERROR, RELOAD_PAGE_QUESTION, UNDEFINED } from '../../../constants/common-message';
import { ColumnsType } from 'antd/lib/table';
import { AppDispatch, RootState } from '../../../store';

/**
 * ListEmployeesRoleAndDepartmentComponent
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
export const ListEmployeesRoleAndDepartmentComponent = () => {

    let history = useHistory();

    const [employeeList, setEmployeeList] = useState<IEmployeeRoleAndDepartment[]>([{
        fullName: '',
        email: '',
        role: '',
        department: ''
    }]);

    const Success = useSelector((state: RootState) => state.isSuccess);
    const Error = useSelector((state: RootState) => state.isError);
    const roleAndDepartment = useSelector((state: RootState) => state.roleAndDepartment);

    const dispatch: AppDispatch = useDispatch();

    const [auxToFetchBoard, setAuxToFetchBoard] = useState(false);
    const [keyword, setKeyword] = useState("");

    /**
     * Load list role and department
     */
    useEffect(() => {
        dispatch(listRoleAndDepartment());
    }, [auxToFetchBoard])

    /**
     * Process search role and department after 500ms
     */
    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(searchEmployeeRoleAndDepartment(keyword));
        }, 500);

        return () => clearTimeout(timer)
    }, [keyword])

    /**
     * Load role and department list when has change, load error and success message
     */
    useEffect(() => {
        if (roleAndDepartment) {
            setEmployeeList(roleAndDepartment);
        }
        if (Error) {
            dispatch(clearState());
        }
        if (Success) {
            dispatch(clearState());
        }
    }, [roleAndDepartment || auxToFetchBoard || Success || Error]);

    /**
     * Load error and success message
     */
    useEffect(() => {
        if (Error) {
            errorPopup(ERROR, Error)
            dispatch(clearState());
        }
        if (Success) {
            message.success(Success);
            dispatch(clearState());
        }
    }, [Success, Error]);

    /**
     * Email list to load to filter
     * @returns email list
     */
    function emailList() {
        let filterEmailList: { text: string, value: string }[] = [];
        var employeeListLength = employeeList.length;

        //Set emails to filterEmailList
        for (let i = 0; i < employeeListLength; i++) {
            var check = true;
            var emailListLength = filterEmailList.length;
            
            for (let j = 0; j < emailListLength; j++) {
                if (employeeList[i].email === filterEmailList[j].text) {
                    check = false;
                    break;
                }
            }
            if (check) {
                filterEmailList.push({ text: employeeList[i].email, value: employeeList[i].email });
            }
        }
        return filterEmailList;
    }

    /**
     * Process action like update or page
     * @param id to handle action update
     * @param order get action type
     */
    const handleActionPage = (email: string, order: string) => {

        var url: string = '';

        if (order === 'update') {
            url = `/admin/employees/update/role-and-department/${email}`;
        }

        //If employee exist, go to update page
        EmployeeService.getEmployeeByEmail(email).then((res) => {
            history.push(url);
        }).catch((error: AxiosError) => {
            const message = error.response?.data.message
                ? error.response?.data.message
                : error.response?.data;
            errorPopup(ERROR, message);
        })
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
        history.push('/admin/employees/role-and-department');
    }

    /**
     * Cancel popup
     */
    const handleCancel = () => {
        console.log(CANCEL_POPUP);
    };
    
     /**
     * Handle set keyword after input change
     * @param event  ChangeEvent<HTMLInputElement
     */
    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.currentTarget.value);
    }

    const columns:ColumnsType<IEmployeeRoleAndDepartment> = [
        {
            title: 'FullName',
            dataIndex: 'fullName',
            key: 'fullName',
            sorter: (a: any, b: any) => a.fullName
                ? a.fullName.localeCompare(b.fullName)
                : "".localeCompare(b.fullName),
            render: (fullName: string) => fullName
                ? fullName
                : UNDEFINED
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            filters: emailList(),
            onFilter: (value: any, record: any) => value ? record.email.includes(value) : "",
            sorter: (a: any, b: any) => a.email
                ? a.email.localeCompare(b.email)
                : "".localeCompare(b.email),
            render: (email: string) => email
                ? email
                : UNDEFINED
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            sorter: (a: any, b: any) => a.role
                ? a.role.localeCompare(b.role)
                : "".localeCompare(b.role),
            render: (role: string) => {
                if (role && role !== UNDEFINED) {
                    return (
                        <span style={{color: 'blue'}} key={role}>
                            {role.substring(5)}
                        </span>
                    );
                } else {
                    return (
                        <span style={{color: 'red'}} key={role}>
                            {UNDEFINED}
                        </span>
                    );
                }
            }
        },
        {
            title: 'Department',
            dataIndex: 'department',
            key: 'department',
            sorter: (a: any, b: any) => a.department
                ? a.department.localeCompare(b.department)
                : "".localeCompare(b.department),
            render: (department: string) => {
                if (department && department !== UNDEFINED) {
                    return (
                        <span style={{color: 'green'}} key={department}>
                            {department}
                        </span>
                    );
                } else {
                    return (
                        <span style={{color: 'red'}} key={department}>
                            {UNDEFINED}
                        </span>
                    );
                }
            }
        },
        {
            title: 'Action',
            key: 'action',
            dataIndex: 'action',
            render: (action: number, record: any) => (
                <Space size="middle">

                    <Tooltip title="Update role and department">
                        <Button
                            type="primary"
                            icon={<EditOutlined />}
                            onClick={() => handleActionPage(record.email, 'update')}
                            tabIndex={-1}>
                        </Button>
                    </Tooltip>
                </Space>
            ),
            width: 200,
        }
    ];

    return (
        <React.Fragment>
            <Row>
                <Col span={24}>
                    <div style={{ float: "right" }}>
                        <Search
                            placeholder="Input search text"
                            allowClear
                            size="large"
                            onChange={handleSearchChange}
                            width={100}
                            style={{ width: '300px', textAlign: 'left', marginBottom: '20px' }}
                            tabIndex={11}
                        />
                    </div>
                </Col>
            </Row>

            <Table
                columns={columns}
                dataSource={employeeList}
                bordered
                pagination={{
                    showQuickJumper: true,
                    defaultPageSize: 5,
                    responsive: true,
                    total: employeeList?.length,
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} pages`,
                    showSizeChanger: true,
                    pageSizeOptions: ['2', '5', '10', '20']
                }}
                title={() => "List Roles And Departments"}
                scroll={{ y: 550, x: 1000 }} />
        </React.Fragment>
    )
}
