import React, { useEffect, useState } from 'react'

import { Table, Modal, Tag, Layout, Space, Tooltip, Button, Popconfirm, message } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import SalaryService from '../../services/SalaryService';
import { AxiosError } from 'axios';
import { IEmployeeSalary } from '../../interfaces/IEmployeeSalary';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderComponent } from '../../components/Header/HeaderComponent';
import { Content } from 'antd/lib/layout/layout';
import { FooterComponent } from '../../components/Footer/FooterComponent';
import { deleteSalaryIndividual, listSalariesByEmail } from '../../actions/individualSalary';
import { clearState } from '../../actions/auth';
import { CANCEL_DELETE, CANCEL_POPUP, ERROR, POPUP_DELETE_TITLE, RELOAD_PAGE_QUESTION } from '../../constants/common-message';
import { ColumnsType } from 'antd/lib/table';

type EmployeeEmail = {
    email: string;
};

/**
 * IndividualSalariesList
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
export const IndividualSalariesList = () => {

    let history = useHistory();
    const { email } = useParams<EmployeeEmail>();

    const Success = useSelector((state: any) => state.isSuccess)
    const Error = useSelector((state: any) => state.isError)
    const salariesIndividual = useSelector((state: any) => state.salariesIndividual);

    const dispatch = useDispatch();

    const { user: currentUser } = useSelector((state: any) => state.auth);

    const [salaryList, setSalaryList] = useState<IEmployeeSalary[]>([{
        employee: '',
        email: '',
        salary: 0,
        createdDate: '',
        endDate: ''
    }]);

    const [auxToFetchBoard, setAuxToFetchBoard] = useState(false);

    /**
     * Load list salary
     */
    useEffect(() => {
        dispatch(listSalariesByEmail(email));
    }, [auxToFetchBoard])

    /**
     * Check if currentUser is null -> redirect to sign in page
     */
    useEffect(() => {
        if (currentUser === null) {
            history.push(`/signin/${"You do not have admin permission!"}`);
        }
    }, [])

    /**
     * Load salary list when has change, load error and success message
     */
    useEffect(() => {
        if (salariesIndividual) {
            setSalaryList(salariesIndividual);
        }
        if (Error) {
            dispatch(clearState());
        }
        if (Success) {
            dispatch(clearState());
        }
    }, [salariesIndividual || auxToFetchBoard || Success || Error]);

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
        dispatch(deleteSalaryIndividual(email, createdDate));
    }

    /**
     * Cancel delete
     * @param e 
     */
    function cancelDelete(e: any) {
        console.log(e);
        message.error(CANCEL_DELETE);
    }

    /**
    * Handle actions like update
    * @param id to handle action
    * @param order action type
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
        history.push(`/salary/employee/${email}`);
    }

    /**
    * Cancel popup
    */
    const handleCancel = () => {
        console.log(CANCEL_POPUP);
    };

    const columns: ColumnsType<IEmployeeSalary> = currentUser.roles[0] !== "ROLE_ADMIN" ? [
        {
            title: 'CreatedDate',
            dataIndex: 'createdDate',
            key: 'createdDate',
            align: 'right'
        },
        {
            title: 'EndDate',
            dataIndex: 'endDate',
            key: 'endDate',
            align: 'right'
        },
        {
            title: 'Salary ($)',
            dataIndex: 'salary',
            key: 'salary',
            align: 'right',
            sorter: (a: any, b: any) => a.salary - b.salary,
            render: (salary: string) => {
                return (
                    <span style={{ color: "blue" }} key={salary}>
                        {salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}
                    </span>
                );
            }
        },
    ] : [
        {
            title: 'CreatedDate',
            dataIndex: 'createdDate',
            key: 'createdDate',
            align: 'right'
        },
        {
            title: 'EndDate',
            dataIndex: 'endDate',
            key: 'endDate',
            align: 'right'
        },
        {
            title: 'Salary ($)',
            dataIndex: 'salary',
            key: 'salary',
            align: 'right',
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
                            onClick={() => handleActionPage(email, record.createdDate, 'update')}
                            tabIndex={-1}>
                        </Button>
                    </Tooltip>

                    <Popconfirm
                        title={POPUP_DELETE_TITLE}
                        onConfirm={() => {
                            deleteItem(email, record.createdDate);
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
            <Layout>
                <HeaderComponent />
                <Content >
                    <Layout className="site-layout-background" >

                        <Content style={{ padding: ' 24px', minHeight: "100vh" }}>
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
                        </Content>

                    </Layout>
                </Content>
                <FooterComponent />
            </Layout>

        </React.Fragment>
    )
}
