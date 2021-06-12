import React, { useEffect, useState } from 'react'

import { Table, Space, Button, Popconfirm, message, Modal, Tag, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import SalaryService from '../../services/SalaryService';
import { AxiosError } from 'axios';
import { IEmployeeSalary } from '../../interfaces/IEmployeeSalary';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSalary, listSalaries } from '../../actions/salary';
import { clearState } from '../../actions/auth';
import { CANCEL_DELETE, CANCEL_POPUP, ERROR, POPUP_DELETE_TITLE, RELOAD_PAGE_QUESTION } from '../../constants/common-message';
import { ColumnsType } from 'antd/lib/table';
import { AppDispatch, RootState } from '../../store';

/**
 * ListSalaryComponent
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
export const ListSalaryComponent = () => {

    let history = useHistory();

    const Success = useSelector((state: RootState) => state.isSuccess)
    const Error = useSelector((state: RootState) => state.isError)
    const salaries = useSelector((state: RootState) => state.salaries);

    const dispatch: AppDispatch = useDispatch();

    const [salaryList, setSalaryList] = useState<IEmployeeSalary[]>([{
        employee: '',
        email: '',
        salary: 0,
        createdDate: '',
        endDate: ''
    }]);

    const [auxToFetchBoard, setAuxToFetchBoard] = useState(false);

    /**
     * Load salary list
     */
    useEffect(() => {
        dispatch(listSalaries());
    }, [auxToFetchBoard])

    /**
     * Load salary list when has change, load error and success message
     */
    useEffect(() => {
        if (salaries) {
            setSalaryList(salaries);
        }
        if (Error) {
            dispatch(clearState());
        }
        if (Success) {
            dispatch(clearState());
        }
    }, [salaries || auxToFetchBoard || Success || Error]);

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
            setAuxToFetchBoard(!auxToFetchBoard);
            dispatch(clearState());
        }
    }, [Success, Error]);

    /**
     * Process delete salary
     * @param email to delete salary
     * @param createdDate to delete salary
     */
    function deleteItem(email: string, createdDate: string) {
        dispatch(deleteSalary(email, createdDate));
    }

    /**
     *  Cancel delete
     * @param e 
     */
    function cancelDelete(e: any) {
        console.log(e);
        message.error(CANCEL_DELETE);
    }

    /**
    * Process action like update
    * @param id to handle action update
    * @param order get action type
    */
    const handleActionPage = (email: string, createdDate: string, order: string) => {

        var url: string = '';

        if (order === 'update') {
            url = `/admin/salary/update/${email}/${createdDate}`;
        }
        SalaryService.getSalaryExistByEmployeeEmailAndCreatedDate(email, createdDate).then((res) => {
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
        history.push('/admin/salary');
        setAuxToFetchBoard(!auxToFetchBoard);
    }

    /**
     * Cancel popup
     */
    const handleCancel = () => {
        console.log(CANCEL_POPUP);
    };

    /**
     * Get fullName list to set to filter
     * @returns fullName list
     */
    function fullNameList() {
        let filterFullNameList: { text: string, value: string }[] = [];

        for (let i = 0; i < salaryList.length; i++) {
            var check = true;
            var fullNameListLength = filterFullNameList.length;
            for (let j = 0; j < fullNameListLength; j++) {
                if (salaryList[i].employee === filterFullNameList[j].text) {
                    check = false;
                    break;
                }
            }
            if (check) {
                filterFullNameList.push({ text: salaryList[i].employee, value: salaryList[i].employee });
            }
        }
        return filterFullNameList;
    }

    /**
     * Get email list to set to filter
     * @returns email list
     */
    function emailList() {
        let filterEmailList: { text: string, value: string }[] = [];

        for (let i = 0; i < salaryList.length; i++) {
            var check = true;
            var emailListLength = filterEmailList.length;
            for (let j = 0; j < emailListLength; j++) {
                if (salaryList[i].email === filterEmailList[j].text) {
                    check = false;
                    break;
                }
            }
            if (check) {
                filterEmailList.push({ text: salaryList[i].email, value: salaryList[i].email });
            }
        }
        return filterEmailList;
    }

    const columns: ColumnsType<IEmployeeSalary> = [
        {
            title: 'Employee',
            dataIndex: 'employee',
            key: 'employee',
            filters: fullNameList(),
            onFilter: (value: any, record: any) => value ? record.employee.includes(value) : "",
            sorter: (a: any, b: any) => a.employee.localeCompare(b.employee),
            render: (employee: string, record: any) => {
                return (
                    <Tooltip title="View Details">
                        <Link to={`/salary/employee/${record.email}`} className="hyperlink">
                            {employee}
                        </Link>
                    </Tooltip>
                );
            }
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            filters: emailList(),
            onFilter: (value: any, record: any) => value ? record.email.includes(value) : "",
            sorter: (a: any, b: any) => a.email.localeCompare(b.email)
        },
        {
            title: 'CreatedDate',
            dataIndex: 'createdDate',
            key: 'createdDate',
            align: 'right'
        },
        {
            title: 'Salary ($)',
            dataIndex: 'salary',
            key: 'salary',
            align: 'right',
            width: 200,
            sorter: (a: any, b: any) => a.salary - b.salary,
            render: (salary: string) => {
                return (
                    <span style={{ color: "blue" }} key={salary}>
                        {salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
                    </span>
                );
            }
        },
        {
            title: 'Action',
            key: 'action',
            dataIndex: 'action',
            render: (action: number, record: any) => (
                <Space size="middle" key={1}>

                    <Tooltip title="Update salary">
                        <Button type="primary"
                            icon={<EditOutlined />}
                            key={1}
                            onClick={() => handleActionPage(record.email, record.createdDate, 'update')}
                            tabIndex={-1}>
                        </Button>
                    </Tooltip>

                    <Popconfirm
                        title={POPUP_DELETE_TITLE}
                        onConfirm={() => {
                            deleteItem(record.email, record.createdDate);
                        }}
                        onCancel={cancelDelete}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Tooltip title="Delete salary">
                            <Button type="primary"
                                icon={<DeleteOutlined />}
                                danger
                                key={2}
                                tabIndex={-1}>
                            </Button>
                        </Tooltip>
                    </Popconfirm>

                </Space>
            ),
            width: 200,
        }
    ];

    return (
        <React.Fragment>
            <Table
                columns={columns}
                dataSource={salaryList}
                bordered
                pagination={{
                    showQuickJumper: true,
                    defaultPageSize: 5,
                    responsive: true,
                    total: salaryList?.length,
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} pages`,
                    showSizeChanger: true,
                    pageSizeOptions: ['2', '5', '10', '20']
                }}
                title={() => "List Salaries"}
                scroll={{ y: 550, x: 1000 }} />
        </React.Fragment>
    )
}
