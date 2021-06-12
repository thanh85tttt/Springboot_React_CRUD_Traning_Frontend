import React, { ChangeEvent, useEffect, useState } from 'react'

import {
    Table,
    Space,
    Button,
    Image,
    Popconfirm,
    message,
    Input,
    Modal,
    Tooltip,
    Row,
    Col
} from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import EmployeeService from '../../../services/EmployeeService';
import { AxiosError } from 'axios';
import { IEmployee } from '../../../interfaces/IEmployee';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEmployeeById, listEmployees, searchEmployees } from '../../../actions/employees';
import { clearState } from '../../../actions/auth';
import {
    CANCEL_DELETE,
    CANCEL_POPUP,
    ERROR,
    POPUP_DELETE_TITLE,
    RELOAD_PAGE_QUESTION,
    UNDEFINED
}
    from '../../../constants/common-message';
import { ColumnsType } from 'antd/lib/table';
import { AppDispatch, RootState } from '../../../store';

const { Search } = Input;

/**
 * ListEmployeesComponent
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
export const ListEmployeesComponent = () => {

    let history = useHistory();

    const { user: currentUser } = useSelector((state: any) => state.auth);
    const Success = useSelector((state: RootState) => state.isSuccess)
    const Error = useSelector((state: RootState) => state.isError)
    const employees = useSelector((state: RootState) => state.employees);

    const dispatch: AppDispatch = useDispatch();

    const [employeeList, setEmployeeList] = useState<IEmployee[]>();
    const [auxToFetchBoard, setAuxToFetchBoard] = useState(false);
    const [keyword, setKeyword] = useState("");

    /**
     * Get list employees
     */
    useEffect(() => {
        dispatch(listEmployees());
    }, [auxToFetchBoard])

    /**
     * Process search employees after 500ms
     */
    useEffect(() => {
        //Apply searchEmployees action after 500ms not write anything into search bar
        const timer = setTimeout(() => {
            dispatch(searchEmployees(keyword));
        }, 500);

        //After search successfully, we need clear timer, otherwise it decrease performance
        return () => clearTimeout(timer)
    }, [keyword])

    /**
     * Reload employees if has change, get error and success message
     */
    useEffect(() => {
        if (employees) {
            setEmployeeList(employees);
        }
        if (Error) {
            dispatch(clearState());
        }
        if (Success) {
            dispatch(clearState());
        }
    }, [employees || auxToFetchBoard || Success || Error]);

    /**
     * Get error and success message
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
     * Process delete employee
     * @param id to delete employee
     */
    function deleteItem(id: number) {
        //Call deleteEmployee action to delete item
        dispatch(deleteEmployeeById(id));
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
     * Load address list and set to filter
     * @returns address list
     */
    function addressList() {
        let filterAddressList: { text: string, value: string }[] = [];

        EmployeeService.getDistinctAddresses().then((res) => {
            res.data.map((address: string) => {
                if (address) {
                    filterAddressList.push({
                        text: address,
                        value: address
                    });
                }
            })
        })

        return filterAddressList;
    }

    /**
     * Handle actions like update or view
     * @param id to handle action
     * @param order action type
     */
    const handleActionPage = (id: number, order: string) => {
        //If action type is update, redirect to update page, otherwise redirect to view page
        if (order === 'update') {
            EmployeeService.getEmployeeById(id).then((res) => {
                history.push(`/admin/employees/update/${id}`);
            }).catch((error: AxiosError) => {
                const message = error.response?.data.message
                    ? error.response?.data.message
                    : error.response?.data;
                errorPopup(ERROR, message);
            })
        } else if (order === 'view') {
            EmployeeService.getEmployeeById(id).then((res) => {
                history.push(`/admin/employees/view/${id}`);
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
        history.push("/admin/employees");
        setAuxToFetchBoard(!auxToFetchBoard);
    }

    /**
     * Cancel popup
     */
    const handleCancel = () => {
        console.log(CANCEL_POPUP);
    };

    /**
     * Handle search by keyword after each change in input
     * @param event ChangeEvent
     */
    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.currentTarget.value);
    }

    const columns: ColumnsType<IEmployee> = [
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            align: "center",
            width: 150,
            render: (image: string) => {
                if (image && image.length > 0) {
                    return (
                        <Image width={80} src={image} />
                    )
                } else {
                    return UNDEFINED
                }
            }
        },
        {
            title: 'FullName',
            dataIndex: 'fullName',
            key: 'fullName',
            width: 250,
            sorter: (a: any, b: any) => a.fullName.localeCompare(b.fullName),
            render: (fullName: string, record: any) => {
                return (
                    <Tooltip title="View Details">
                        <Link to="#" className="hyperlink" onClick={() => handleActionPage(record.id, 'view')}>
                            {fullName}
                        </Link>
                    </Tooltip>
                );
            }
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 250,
            sorter: (a: any, b: any) => a.email.localeCompare(b.email),
            render: (email: string) => email ? email : UNDEFINED
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            width: 200,
            align: 'right',
            render: (phone: string) => phone ? phone : UNDEFINED
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            width: 400,
            filters: addressList(),
            onFilter: (value: any, record: any) => value ? record.address.includes(value) : "",
            sorter: (a: any, b: any) => a.address.localeCompare(b.address),
            render: (address: string) => address ? address : UNDEFINED
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            width: 100,
            filters: [
                { text: 'Male', value: 'Male' },
                { text: 'Female', value: 'Female' },
                { text: UNDEFINED, value: UNDEFINED }
            ],
            onFilter: (value: any, record: any) => record.gender.includes(value),

            render: (gender: string) => {
                if (gender === 'Male') {
                    return (
                        <span style={{ color: 'blue' }} key={gender}>
                            {gender ? gender.toUpperCase() : ""}
                        </span>
                    );
                } else if (gender === 'Female') {
                    return (
                        <span style={{ color: 'green' }} key={gender}>
                            {gender ? gender.toUpperCase() : ""}
                        </span>
                    );
                } else {
                    return (
                        <span style={{ color: 'red' }} key={gender}>
                            {UNDEFINED}
                        </span>
                    );
                }
            }
        },
        {
            title: 'Action',
            key: 'action',
            dataIndex: 'id',
            render: (id: number, record: any) => (
                <Space size="middle" key={id}>

                    <Tooltip title="Update employee">
                        <Button type="primary"
                            icon={<EditOutlined />}
                            key={id}
                            onClick={() => handleActionPage(id, 'update')}
                            tabIndex={-1}>
                        </Button>
                    </Tooltip>

                    <Popconfirm
                        title={POPUP_DELETE_TITLE}
                        onConfirm={() => {
                            deleteItem(id);
                        }}
                        onCancel={cancelDelete}
                        okText="Yes"
                        cancelText="No"
                        disabled={currentUser.username === record.email ? true : false}
                    >
                        <Tooltip title="Delete employee">
                            <Button type="primary"
                                icon={<DeleteOutlined />}
                                danger
                                key={id + 1}
                                disabled={currentUser.username === record.email ? true : false}
                                tabIndex={-1}
                            >
                            </Button>
                        </Tooltip>
                    </Popconfirm>

                    <Tooltip title="View employee">
                        <Button type="primary" key={id + 2}
                            onClick={() => handleActionPage(id, 'view')}
                            tabIndex={-1}
                            className="button-view"
                        >
                            View
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
                title={() => "List Employees"}
                scroll={{ y: 500, x: 1000 }}
            />
        </React.Fragment>
    )
}
