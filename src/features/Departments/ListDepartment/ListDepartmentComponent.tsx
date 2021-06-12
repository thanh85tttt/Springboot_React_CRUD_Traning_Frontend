import React, { ChangeEvent, useEffect, useState } from 'react'

import { Table, Space, Button, Popconfirm, message, Modal, Tooltip, Row, Col } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { AxiosError } from 'axios';
import DepartmentService from '../../../services/DepartmentService';
import { IDepartment } from '../../../interfaces/IDepartment';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDepartment, listDepartments, searchDepartments } from '../../../actions/department';
import { clearState } from '../../../actions/auth';
import Search from 'antd/lib/input/Search';
import { CANCEL_DELETE, CANCEL_POPUP, ERROR, RELOAD_PAGE_QUESTION } from '../../../constants/common-message';
import { ColumnsType } from 'antd/lib/table';
import { AppDispatch, RootState } from '../../../store';

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
export const ListDepartmentsComponent = () => {

    let history = useHistory();

    const [departmentsList, setDepartmentsList] = useState<IDepartment[]>([{
        id: 1,
        department: '',
        createdDate: '',
        fullName: ''
    }]);

    const [auxToFetchBoard, setAuxToFetchBoard] = useState(false);
    const [keyword, setKeyword] = useState("");

    const departments = useSelector((state: RootState) => state.departments);
    const Success = useSelector((state: RootState) => state.isSuccess)
    const Error = useSelector((state: RootState) => state.isError)

    const dispatch: AppDispatch = useDispatch();

    /**
     * Get All Departments From Server 
    */
    useEffect(() => {
        dispatch(listDepartments());
    }, [auxToFetchBoard])

    /**
     * Process search after 500ms
     */
    useEffect(() => {
        //Apply searchDepartments action after 500ms not write anything into search bar
        const timer = setTimeout(() => {
            dispatch(searchDepartments(keyword));
        }, 500);

        //After search successfully, we need clear timer, otherwise it decrease performance
        return () => clearTimeout(timer)
    }, [keyword])

    /**
     * Load department list when has change, load error and success message
     */
    useEffect(() => {
        if (departments) {
            setDepartmentsList(departments);
        }
        if (Error) {
            dispatch(clearState());
        }
        if (Success) {
            dispatch(clearState());
        }
    }, [departments || auxToFetchBoard || Success || Error]);

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
     * Process delete department
     * @param id to delete department
     */
    function deleteItem(id: number) {
        //Call deleteDepartment action to delete item
        dispatch(deleteDepartment(id));
    }

    /**
     * Cancel delete
     * @param e show cancel delete message
     */
    function cancelDelete(e: any) {
        console.log(e);
        message.error(CANCEL_DELETE);
    }

    /**
     * Process action like update or page
     * @param id to handle action update
     * @param order get action type
     */
    const handleActionPage = (id: number, order: string) => {

        var url: string = '';

        if (order === 'update') {
            url = `/admin/departments/update/${id}`;
        }

        //If department is exist, go to update page
        DepartmentService.getDepartmentById(id).then((res) => {
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
        history.push("/admin/departments");
        setAuxToFetchBoard(!auxToFetchBoard);
    }

    /**
     * Cancel popup
     */
    const handleCancel = () => {
        message.info(CANCEL_POPUP);
    };

    /**
     * Handle set keyword after input change
     * @param event  ChangeEvent<HTMLInputElement
     */
    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.currentTarget.value);
    }

    /**
     * Set column for table
     */
    const columns: ColumnsType<any> = [
        {
            title: 'Department',
            dataIndex: 'department',
            key: 'department',
            width: 400,
            sorter: (a: any, b: any) => a.department.localeCompare(b.department)
        },
        {
            title: 'CreatedDate',
            dataIndex: 'createdDate',
            key: 'createdDate',
            align: "right",
            width: 300,
            sorter: (a: any, b: any) => +new Date(a.createdDate) - +new Date(b.createdDate)
        },
        {
            title: 'FullName',
            dataIndex: 'fullName',
            key: 'fullName',
            sorter: (a: any, b: any) => a.fullName.localeCompare(b.fullName)
        },
        {
            title: 'Action',
            key: 'action',
            dataIndex: 'id',
            render: (id: number) => (
                <Space size="middle">

                    <Tooltip title="Update department">
                        <Button type="primary"
                            icon={<EditOutlined />}
                            onClick={() => handleActionPage(id, 'update')}
                            tabIndex={-1}
                        >
                        </Button>

                    </Tooltip>

                    <Popconfirm
                        title="Are you sure to delete this task?"
                        onConfirm={() => {
                            deleteItem(id);
                        }}
                        onCancel={cancelDelete}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Tooltip title="Delete department">
                            <Button type="primary"
                                icon={<DeleteOutlined />}
                                danger
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

            <Table columns={columns}
                dataSource={departmentsList}
                bordered
                pagination={{
                    showQuickJumper: true,
                    defaultPageSize: 5,
                    responsive: true,
                    total: departmentsList?.length,
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} pages`,
                    showSizeChanger: true,
                    pageSizeOptions: ['2', '5', '10', '20']
                }}
                title={() => "List Departments"}
                scroll={{ y: 550, x: 1000 }} />
        </React.Fragment>
    )
}
