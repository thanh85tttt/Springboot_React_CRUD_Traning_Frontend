import React, { ChangeEvent, useEffect, useState } from 'react'

import { Table, Space, Button, Popconfirm, message, Modal, Tooltip, Row, Col } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { AxiosError } from 'axios';
import RoleService from '../../../services/RoleService';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRole, listRoles, searchRoles } from '../../../actions/role';
import { clearState } from '../../../actions/auth';
import Search from 'antd/lib/input/Search';
import { CANCEL_DELETE, CANCEL_POPUP, ERROR, POPUP_DELETE_TITLE, RELOAD_PAGE_QUESTION } from '../../../constants/common-message';
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
export const ListRolesComponent = () => {

    let history = useHistory();

    const Success = useSelector((state: RootState) => state.isSuccess)
    const Error = useSelector((state: RootState) => state.isError)
    const roles = useSelector((state: RootState) => state.roles);

    const dispatch: AppDispatch = useDispatch();

    const [rolesList, setRolesList] = useState([{
        id: 1,
        role: '',
        createdDate: new Date(),
    }]);
    const [auxToFetchBoard, setAuxToFetchBoard] = useState(false);
    const [keyword, setKeyword] = useState("");

    /**
    * Get All Roles From Server 
   */
    useEffect(() => {
        dispatch(listRoles());
    }, [auxToFetchBoard])

    /**
    * Process search after 500ms
    */
    useEffect(() => {
        //Apply searchRoles action after 500ms not write anything into search bar
        const timer = setTimeout(() => {
            dispatch(searchRoles(keyword));
        }, 500);

        //After search successfully, we need clear timer, otherwise it decrease performance
        return () => clearTimeout(timer)
    }, [keyword])

    /**
     * Load department list when has change, load error and success message
     */
    useEffect(() => {
        if (roles) {
            setRolesList(roles);
        }
        if (Error) {
            dispatch(clearState());
        }
        if (Success) {
            dispatch(clearState());
        }
    }, [roles || auxToFetchBoard || Success || Error]);

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
    * Process delete role
    * @param id to delete role
    */
    function deleteItem(id: number) {
        dispatch(deleteRole(id));
    }

    /**
     * Cancel delete
     * @param e show cancel delete message
     */
    function cancelDelete(e: any) {
        console.log(e);
        message.info(CANCEL_DELETE);
    }

    /**
    * Process action like update or page
    * @param id to handle action update
    * @param order get action type
    */
    const handleActionPage = (id: number, order: string) => {

        var url: string = '';

        if (order === 'update') {
            url = `/admin/roles/update/${id}`;
        }

        //If role exist by id, go to update page
        RoleService.getRoleById(id).then((res) => {
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
        history.push("/admin/roles");
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
    * @param event ChangeEvent<HTMLInputElement>
    */
    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.currentTarget.value);
    }

    const columns: ColumnsType<any> = [
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            width: 300,
            sorter: (a: any, b: any) => a.role.localeCompare(b.role),
            render: (role: string) => role.substring(5)
        },
        {
            title: 'CreatedDate',
            dataIndex: 'createdDate',
            key: 'createdDate',
            align: 'right',
            width: 200,
            sorter: (a: any, b: any) => +new Date(a.createdDate) - +new Date(b.createdDate)
        },
        {
            title: 'Action',
            key: 'action',
            dataIndex: 'id',
            render: (id: number) => (
                <Space size="middle">

                    <Tooltip title="Update role">
                        <Button type="primary" icon={<EditOutlined />}
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
                    >
                        <Tooltip title="Delete role">
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
                dataSource={rolesList}
                bordered
                pagination={{
                    showQuickJumper: true,
                    defaultPageSize: 5,
                    responsive: true,
                    total: rolesList?.length,
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} pages`,
                    showSizeChanger: true,
                    pageSizeOptions: ['2', '5', '10', '20']
                }}
                title={() => "List Roles"}
                scroll={{ y: 550, x: 1000 }} />
        </React.Fragment>
    )
}
